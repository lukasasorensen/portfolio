import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage } from "@langchain/core/messages";
import { createAgent } from "langchain";
import { toBaseMessages } from "@ai-sdk/langchain";
import { createUIMessageStream, createUIMessageStreamResponse, isToolUIPart, UIMessage } from "ai";
import { MAIN_RESUME_AI_SYSTEM_PROMPT } from "@/constants/system-prompts/MainResumeAISystemPrompt";
import {
  getBlogAndProjectsTool,
  getBlogPostByIdTool,
  getContactInfoTool,
  getProjectByIdTool,
  getResumeTool,
} from "./tools";

const MAX_INPUT_LENGTH = 2000;
const MAX_MESSAGES = 20;
const REASONING_MODEL_PREFIXES = ["o1", "o3", "gpt-5"];
const DEFAULT_BURST_WINDOW_MS = 60_000;
const DEFAULT_BURST_MAX_REQUESTS = 10;
const DEFAULT_DAILY_MAX_REQUESTS = 100;
const MAX_DEVICE_ID_LENGTH = 128;
const COUNTER_CLEANUP_INTERVAL = 200;

const SYSTEM_PROMPT = MAIN_RESUME_AI_SYSTEM_PROMPT;

type StreamEvent = {
  data?: Record<string, unknown>;
  event?: string;
  name?: string;
  run_id?: string;
};

type WindowCounter = {
  count: number;
  resetAt: number;
};

type DayCounter = {
  count: number;
  day: string;
};

const burstRequestCounters = new Map<string, WindowCounter>();
const dailyRequestCounters = new Map<string, DayCounter>();
let requestsSinceCounterCleanup = 0;

const parseCsvEnvToSet = (value?: string) =>
  new Set(
    (value ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );

const parsePositiveIntegerEnv = (value: string | undefined, fallback: number) => {
  const normalized = (value ?? "").trim();
  if (!/^\d+$/.test(normalized)) {
    return fallback;
  }

  const parsed = Number.parseInt(normalized, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const getClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) {
    return cfIp;
  }

  return null;
};

const getDeviceIdFromRequest = (request: NextRequest) => {
  const headerValue = request.headers.get("x-device-id")?.trim();
  if (!headerValue || headerValue.length > MAX_DEVICE_ID_LENGTH || !/^[a-zA-Z0-9-]+$/.test(headerValue)) {
    return null;
  }

  return headerValue;
};

const incrementBurstCounter = (key: string, nowMs: number, windowMs: number): WindowCounter => {
  const current = burstRequestCounters.get(key);

  if (!current || current.resetAt <= nowMs) {
    const next = { count: 1, resetAt: nowMs + windowMs };
    burstRequestCounters.set(key, next);
    return next;
  }

  const next = { ...current, count: current.count + 1 };
  burstRequestCounters.set(key, next);
  return next;
};

const incrementDayCounter = (key: string, dayKey: string): DayCounter => {
  const current = dailyRequestCounters.get(key);

  if (!current || current.day !== dayKey) {
    const next = { count: 1, day: dayKey };
    dailyRequestCounters.set(key, next);
    return next;
  }

  const next = { ...current, count: current.count + 1 };
  dailyRequestCounters.set(key, next);
  return next;
};

const getSecondsUntilNextUtcDay = (now: Date) => {
  const nextDay = new Date(now);
  nextDay.setUTCHours(24, 0, 0, 0);
  return Math.max(1, Math.ceil((nextDay.getTime() - now.getTime()) / 1000));
};

const cleanupExpiredCounters = (nowMs: number, dayKey: string) => {
  requestsSinceCounterCleanup += 1;
  if (requestsSinceCounterCleanup < COUNTER_CLEANUP_INTERVAL) {
    return;
  }

  requestsSinceCounterCleanup = 0;

  for (const [key, counter] of burstRequestCounters) {
    if (counter.resetAt <= nowMs) {
      burstRequestCounters.delete(key);
    }
  }

  for (const [key, counter] of dailyRequestCounters) {
    if (counter.day !== dayKey) {
      dailyRequestCounters.delete(key);
    }
  }
};

const normalizeToolInputs = (messages: UIMessage[]): UIMessage[] =>
  messages.map((message) => {
    if (message.role !== "assistant") {
      return message;
    }

    return {
      ...message,
      parts: message.parts.map((part) => {
        if (!isToolUIPart(part) || part.input !== undefined) {
          return part;
        }

        return {
          ...part,
          input: "rawInput" in part ? part.rawInput : {},
        };
      }),
    };
  });

const extractReasoningFromChunk = (chunk: Record<string, unknown>) => {
  const kwargs =
    chunk.kwargs && typeof chunk.kwargs === "object" ? (chunk.kwargs as Record<string, unknown>) : chunk;
  const contentBlocks = kwargs.contentBlocks;

  if (Array.isArray(contentBlocks)) {
    const reasoning = contentBlocks
      .map((block) => {
        if (!block || typeof block !== "object") {
          return null;
        }

        if ("reasoning" in block && typeof block.reasoning === "string") {
          return block.reasoning;
        }

        if ("thinking" in block && typeof block.thinking === "string") {
          return block.thinking;
        }

        return null;
      })
      .filter((value): value is string => Boolean(value))
      .join("");

    if (reasoning) {
      return reasoning;
    }
  }

  const additionalKwargs =
    kwargs.additional_kwargs && typeof kwargs.additional_kwargs === "object"
      ? (kwargs.additional_kwargs as Record<string, unknown>)
      : undefined;
  const reasoningSummary =
    additionalKwargs?.reasoning &&
    typeof additionalKwargs.reasoning === "object" &&
    "summary" in additionalKwargs.reasoning &&
    Array.isArray(additionalKwargs.reasoning.summary)
      ? additionalKwargs.reasoning.summary
      : undefined;

  if (!reasoningSummary) {
    return undefined;
  }

  const reasoning = reasoningSummary
    .map((item) => (item && typeof item === "object" && "text" in item && typeof item.text === "string" ? item.text : null))
    .filter((value): value is string => Boolean(value))
    .join("");

  return reasoning || undefined;
};

const extractTextFromChunk = (chunk: Record<string, unknown>) => {
  const content = chunk.content;

  if (typeof content === "string") {
    return content;
  }

  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .map((part) => {
      if (!part || typeof part !== "object" || !("type" in part) || part.type !== "text" || !("text" in part)) {
        return "";
      }

      return typeof part.text === "string" ? part.text : "";
    })
    .join("");
};

export async function POST(req: NextRequest) {
  try {
    const now = new Date();
    const nowMs = now.getTime();
    const dayKey = now.toISOString().slice(0, 10);
    cleanupExpiredCounters(nowMs, dayKey);
    const burstWindowMs = parsePositiveIntegerEnv(process.env.CHAT_RATE_LIMIT_WINDOW_MS, DEFAULT_BURST_WINDOW_MS);
    const burstMaxRequests = parsePositiveIntegerEnv(
      process.env.CHAT_RATE_LIMIT_MAX_REQUESTS_PER_WINDOW,
      DEFAULT_BURST_MAX_REQUESTS,
    );
    const dailyMaxRequests = parsePositiveIntegerEnv(
      process.env.CHAT_RATE_LIMIT_MAX_REQUESTS_PER_DAY,
      DEFAULT_DAILY_MAX_REQUESTS,
    );
    const bannedIps = parseCsvEnvToSet(process.env.CHAT_BANNED_IPS);
    const bannedDeviceIds = parseCsvEnvToSet(process.env.CHAT_BANNED_DEVICE_IDS);
    const clientIp = getClientIp(req);
    const deviceId = getDeviceIdFromRequest(req);

    if (clientIp && bannedIps.has(clientIp)) {
      return NextResponse.json({ error: "Access denied for this IP address." }, { status: 403 });
    }

    if (deviceId && bannedDeviceIds.has(deviceId)) {
      return NextResponse.json({ error: "Access denied for this device." }, { status: 403 });
    }

    if (!clientIp && !deviceId) {
      return NextResponse.json(
        { error: "Missing identifying information. Please enable headers and try again." },
        { status: 400 },
      );
    }

    const identityKeys = new Set<string>();
    if (clientIp) {
      identityKeys.add(`ip:${clientIp}`);
    }
    if (deviceId) {
      identityKeys.add(`device:${deviceId}`);
    }
    if (clientIp && deviceId) {
      identityKeys.add(`pair:${clientIp}:${deviceId}`);
    }

    for (const key of identityKeys) {
      const burstCounter = incrementBurstCounter(key, nowMs, burstWindowMs);
      if (burstCounter.count > burstMaxRequests) {
        const retryAfterSeconds = Math.max(1, Math.ceil((burstCounter.resetAt - nowMs) / 1000));
        return NextResponse.json(
          {
            error: "Too many requests in a short period. Please wait and try again.",
          },
          {
            headers: { "Retry-After": String(retryAfterSeconds) },
            status: 429,
          },
        );
      }

      const dayCounter = incrementDayCounter(key, dayKey);
      if (dayCounter.count > dailyMaxRequests) {
        return NextResponse.json(
          {
            error: "Daily usage limit reached. Please try again tomorrow.",
          },
          {
            headers: { "Retry-After": String(getSecondsUntilNextUtcDay(now)) },
            status: 429,
          },
        );
      }
    }

    const body = await req.json();
    const uiMessages: UIMessage[] = body.messages ?? [];

    if (!Array.isArray(uiMessages) || uiMessages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    // Enforce history length limit
    const trimmedMessages = normalizeToolInputs(uiMessages.slice(-MAX_MESSAGES));

    // Validate last user message length
    const lastMessage = trimmedMessages[trimmedMessages.length - 1];
    const lastTextPart = lastMessage?.parts?.find((p: { type: string }) => p.type === "text") as
      | { type: "text"; text: string }
      | undefined;
    if (!lastTextPart?.text) {
      return NextResponse.json({ error: "Invalid message format." }, { status: 400 });
    }
    if (lastTextPart.text.length > MAX_INPUT_LENGTH) {
      return NextResponse.json({ error: "Message too long. Please keep it under 2000 characters." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "LLM API key is not configured." }, { status: 500 });
    }

    const modelName = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
    const supportsReasoning = REASONING_MODEL_PREFIXES.some((prefix) => modelName.startsWith(prefix));

    const model = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName,
      streaming: true,
      ...(supportsReasoning
        ? {
            reasoning: {
              effort: "medium",
              summary: "auto",
            },
          }
        : {
            temperature: 0.7,
          }),
    });

    // Convert UIMessages to LangChain BaseMessages
    const baseMessages = await toBaseMessages(trimmedMessages);
    const agentMessages = [new SystemMessage(SYSTEM_PROMPT), ...baseMessages];

    // Create a ReAct agent with all recruiter-facing tools
    const agent = createAgent({
      model: model,
      tools: [getResumeTool, getContactInfoTool, getBlogAndProjectsTool, getBlogPostByIdTool, getProjectByIdTool],
    });

    const agentStream = await agent.streamEvents({ messages: agentMessages }, { version: "v2" });

    return createUIMessageStreamResponse({
      stream: createUIMessageStream({
        execute: async ({ writer }) => {
          const streamState = {
            messageId: "langchain-msg-1",
            reasoningMessageId: null as string | null,
            reasoningStarted: false,
            started: false,
            textMessageId: null as string | null,
            textStarted: false,
          };

          writer.write({ type: "start" });

          for await (const rawEvent of agentStream as AsyncIterable<unknown>) {
            if (!rawEvent || typeof rawEvent !== "object") {
              continue;
            }

            const event = rawEvent as StreamEvent;
            const data = event.data && typeof event.data === "object" ? event.data : undefined;

            if (event.run_id && !streamState.started) {
              streamState.messageId = event.run_id;
            }

            switch (event.event) {
              case "on_chat_model_start": {
                const runId =
                  event.run_id ?? (typeof data?.run_id === "string" ? data.run_id : undefined);
                if (runId) {
                  streamState.messageId = runId;
                }
                break;
              }
              case "on_chat_model_stream": {
                const chunk = data?.chunk;
                if (!chunk || typeof chunk !== "object") {
                  break;
                }

                const chunkRecord = chunk as Record<string, unknown>;

                if (typeof chunkRecord.id === "string") {
                  streamState.messageId = chunkRecord.id;
                }

                const reasoning = extractReasoningFromChunk(chunkRecord);
                if (reasoning) {
                  if (!streamState.reasoningStarted) {
                    streamState.reasoningMessageId = streamState.messageId;
                    writer.write({ id: streamState.messageId, type: "reasoning-start" });
                    streamState.reasoningStarted = true;
                    streamState.started = true;
                  }

                  writer.write({
                    delta: reasoning,
                    id: streamState.reasoningMessageId ?? streamState.messageId,
                    type: "reasoning-delta",
                  });
                }

                const text = extractTextFromChunk(chunkRecord);
                if (!text) {
                  break;
                }

                if (streamState.reasoningStarted && !streamState.textStarted) {
                  writer.write({
                    id: streamState.reasoningMessageId ?? streamState.messageId,
                    type: "reasoning-end",
                  });
                  streamState.reasoningStarted = false;
                }

                if (!streamState.textStarted) {
                  streamState.textMessageId = streamState.messageId;
                  writer.write({ id: streamState.messageId, type: "text-start" });
                  streamState.textStarted = true;
                  streamState.started = true;
                }

                writer.write({
                  delta: text,
                  id: streamState.textMessageId ?? streamState.messageId,
                  type: "text-delta",
                });
                break;
              }
              case "on_tool_start": {
                const runId =
                  event.run_id ?? (typeof data?.run_id === "string" ? data.run_id : undefined);
                const toolName =
                  event.name ?? (typeof data?.name === "string" ? data.name : undefined);

                if (!runId || !toolName) {
                  break;
                }

                writer.write({
                  dynamic: true,
                  toolCallId: runId,
                  toolName,
                  type: "tool-input-start",
                });

                if (data && "input" in data) {
                  writer.write({
                    dynamic: true,
                    input: data.input,
                    toolCallId: runId,
                    toolName,
                    type: "tool-input-available",
                  });
                }

                break;
              }
              case "on_tool_end": {
                const runId =
                  event.run_id ?? (typeof data?.run_id === "string" ? data.run_id : undefined);

                if (!runId) {
                  break;
                }

                writer.write({
                  output: data?.output,
                  toolCallId: runId,
                  type: "tool-output-available",
                });
                break;
              }
            }
          }

          if (streamState.reasoningStarted) {
            writer.write({
              id: streamState.reasoningMessageId ?? streamState.messageId,
              type: "reasoning-end",
            });
          }

          if (streamState.textStarted) {
            writer.write({
              id: streamState.textMessageId ?? streamState.messageId,
              type: "text-end",
            });
          }

          writer.write({ type: "finish" });
        },
      }),
    });
  } catch (err) {
    console.error("[/api/chat] error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
