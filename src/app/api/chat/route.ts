import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage } from "@langchain/core/messages";
import { toUIMessageStream, toBaseMessages } from "@ai-sdk/langchain";
import { createUIMessageStreamResponse, UIMessage } from "ai";

const MAX_INPUT_LENGTH = 2000;
const MAX_MESSAGES = 20;

const SYSTEM_PROMPT = `You are a helpful assistant embedded in Lukas A Sorensen's portfolio website. \
Lukas is a Full Stack Engineer. Answer questions about his work, skills, and experience in a friendly \
and concise way. If you don't know something specific about Lukas, say so honestly.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const uiMessages: UIMessage[] = body.messages ?? [];

    if (!Array.isArray(uiMessages) || uiMessages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    // Enforce history length limit
    const trimmedMessages = uiMessages.slice(-MAX_MESSAGES);

    // Validate last user message length
    const lastMessage = trimmedMessages[trimmedMessages.length - 1];
    const lastTextPart = lastMessage?.parts?.find((p: { type: string }) => p.type === "text") as
      | { type: "text"; text: string }
      | undefined;
    if (!lastTextPart?.text) {
      return NextResponse.json({ error: "Invalid message format." }, { status: 400 });
    }
    if (lastTextPart.text.length > MAX_INPUT_LENGTH) {
      return NextResponse.json(
        { error: "Message too long. Please keep it under 2000 characters." },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "LLM API key is not configured." }, { status: 500 });
    }

    const model = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      streaming: true,
      temperature: 0.7,
    });

    // Convert UIMessages to LangChain BaseMessages and prepend system prompt
    const baseMessages = await toBaseMessages(trimmedMessages);
    const langchainMessages = [new SystemMessage(SYSTEM_PROMPT), ...baseMessages];

    const langchainStream = await model.stream(langchainMessages);

    return createUIMessageStreamResponse({
      stream: toUIMessageStream(langchainStream),
    });
  } catch (err) {
    console.error("[/api/chat] error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
