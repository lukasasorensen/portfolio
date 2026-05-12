"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, getToolName, isReasoningUIPart, isTextUIPart, isToolUIPart } from "ai";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
  MessageToolbar,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ai-elements/reasoning";
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput, type ToolPart } from "@/components/ai-elements/tool";
import { CopyIcon, MessageSquareTextIcon, RefreshCwIcon } from "lucide-react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const transport = new DefaultChatTransport({ api: "/api/chat" });
const suggestions = [
  "What are Lukas A Sorensen's strongest recent projects?",
  "Summarize Lukas A Sorensen's experience in one paragraph.",
  "Which frontend and backend technologies does Lukas A Sorensen use?",
];

const formatToolTitle = (toolName: string) =>
  toolName.replace(/[_-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

type InlineToolCallProps = {
  messageId: string;
  part: ToolPart;
};

function InlineToolCall({ messageId, part }: InlineToolCallProps) {
  const title = formatToolTitle(getToolName(part));
  const [open, setOpen] = useState(false);

  return (
    <Tool key={`${messageId}-${part.toolCallId}`} onOpenChange={setOpen} open={open}>
      {part.type === "dynamic-tool" ? (
        <ToolHeader state={part.state} title={title} toolName={part.toolName} type={part.type} />
      ) : (
        <ToolHeader state={part.state} title={title} type={part.type} />
      )}
      <ToolContent>
        <ToolInput input={part.input} />
        <ToolOutput errorText={part.errorText} output={part.output} />
      </ToolContent>
    </Tool>
  );
}

export default function ChatUI() {
  const { messages, sendMessage, regenerate, setMessages, stop, status, error } = useChat({
    transport,
  });
  const [input, setInput] = useState("");
  const [copyError, setCopyError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;
  const isLoading = status === "streaming" || status === "submitted";

  const lastAssistantMessage = useMemo(
    () => [...messages].reverse().find((message) => message.role === "assistant"),
    [messages],
  );

  useEffect(() => {
    if (hasMessages) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    if (error) {
      console.error("ERROR CALLING AI: ", error);
    }
  }, [hasMessages, messages, status, error]);

  function handleSubmit(message: PromptInputMessage) {
    const text = message.text.trim();

    if (!text || isLoading) {
      return;
    }

    sendMessage({ text });
    setInput("");
  }

  async function handleCopyResponse(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyError(null);
    } catch (clipboardError) {
      console.error("Failed to copy response:", clipboardError);
      setCopyError("Could not copy response. Please copy it manually.");
    }
  }

  return (
    <div className="flex h-full min-h-[70vh] w-full flex-1">
      {hasMessages ? (
        <div className="flex h-full min-h-[70vh] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between gap-10 border-b border-white/10 px-6 py-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-400/80">AI Chat</p>
              <h1 className="mt-2 text-2xl font-semibold text-white">Ask about Lukas</h1>
            </div>
            <button
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
              onClick={() => {
                setMessages([]);
                setInput("");
              }}
              type="button"
            >
              New chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-10 py-6">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
              {messages.map((message) => {
                const textParts = message.parts.filter(isTextUIPart);
                const reasoningParts = message.parts.filter(isReasoningUIPart);
                const contentParts = message.parts.filter((part) => isTextUIPart(part) || isToolUIPart(part));

                if (textParts.length === 0 && reasoningParts.length === 0 && contentParts.length === 0) {
                  return null;
                }

                const textContent = textParts.map((part) => part.text).join("\n\n");
                const reasoningContent = reasoningParts
                  .map((part) => part.text)
                  .join("\n\n")
                  .trim();
                const isReasoningStreaming = reasoningParts.some((part) => part.state === "streaming");
                const showActions = lastAssistantMessage?.id === message.id && textParts.length > 0;

                return (
                  <Fragment key={message.id}>
                    <Message from={message.role}>
                      <MessageContent className={message.role === "assistant" ? "max-w-none space-y-10" : undefined}>
                        {message.role === "assistant" && reasoningContent && (
                          <Reasoning isStreaming={isReasoningStreaming}>
                            <ReasoningTrigger />
                            <ReasoningContent>{reasoningContent}</ReasoningContent>
                          </Reasoning>
                        )}
                        {message.role === "assistant" ? (
                          <div className="flex flex-wrap items-start gap-10">
                            {contentParts.map((part, index) => {
                              if (isTextUIPart(part)) {
                                return (
                                  <div className="w-full space-y-3" key={`${message.id}-text-${index}`}>
                                    {index === contentParts.findIndex(isTextUIPart) && (
                                      <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-400/75">
                                        Assistant
                                      </div>
                                    )}
                                    <MessageResponse>{part.text}</MessageResponse>
                                  </div>
                                );
                              }

                              if (isToolUIPart(part)) {
                                return (
                                  <div className="w-full max-w-md" key={`${message.id}-tool-${index}`}>
                                    <InlineToolCall
                                      key={`${message.id}-${part.toolCallId}`}
                                      messageId={message.id}
                                      part={part}
                                    />
                                  </div>
                                );
                              }
                            })}
                          </div>
                        ) : (
                          textParts.map((part, index) => (
                            <MessageResponse key={`${message.id}-${index}`}>{part.text}</MessageResponse>
                          ))
                        )}
                      </MessageContent>
                    </Message>
                    {message.role === "assistant" && showActions && (
                      <MessageToolbar className="mt-0">
                        <MessageActions>
                          <MessageAction label="Retry response" onClick={() => void regenerate()} tooltip="Retry">
                            <RefreshCwIcon className="size-3.5" />
                          </MessageAction>
                          <MessageAction
                            label="Copy response"
                            onClick={() => void handleCopyResponse(textContent)}
                            tooltip="Copy"
                          >
                            <CopyIcon className="size-3.5" />
                          </MessageAction>
                        </MessageActions>
                      </MessageToolbar>
                    )}
                    {message.role === "assistant" && showActions && copyError && (
                      <p className="mt-2 text-xs text-red-400">{copyError}</p>
                    )}
                  </Fragment>
                );
              })}
              <div ref={bottomRef} />
            </div>
          </div>

          <div className="border-t border-white/10 bg-slate-950/95 p-4">
            <PromptInput className="mx-auto w-full max-w-3xl" onSubmit={handleSubmit}>
              <PromptInputBody>
                <PromptInputTextarea
                  autoComplete="off"
                  className="max-h-40 min-h-[3.25rem]"
                  disabled={isLoading}
                  maxLength={2000}
                  onChange={(event) => setInput(event.currentTarget.value)}
                  placeholder="Ask a follow-up..."
                  value={input}
                />
              </PromptInputBody>
              <PromptInputFooter>
                <p className="text-xs text-white/50">{input.length}/2000</p>
                <PromptInputSubmit disabled={!input.trim() && !isLoading} onStop={stop} status={status} />
              </PromptInputFooter>
            </PromptInput>
            {error && <p className="mt-3 text-center text-sm text-red-400">Something went wrong. Please try again.</p>}
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-1 items-center justify-center">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center">
            <h2 className="flex text-xl font-semibold tracking-tight text-white sm:text-5xl">
              <Image alt="ai logo" className="h-10 w-auto" src="/ai.svg" width={20} height={20} /> Ask AI anything about
              me!
            </h2>

            <PromptInput className="mt-10 w-full max-w-2xl" onSubmit={handleSubmit}>
              <PromptInputBody>
                <PromptInputTextarea
                  autoComplete="off"
                  className="max-h-40 min-h-[4rem] text-base"
                  disabled={isLoading}
                  maxLength={2000}
                  onChange={(event) => setInput(event.currentTarget.value)}
                  placeholder="Ask about projects, experience, or technical skills..."
                  value={input}
                />
              </PromptInputBody>
              <PromptInputFooter>
                <p className="text-xs text-white/50">{input.length}/2000</p>
                <PromptInputSubmit disabled={!input.trim() && !isLoading} onStop={stop} status={status} />
              </PromptInputFooter>
            </PromptInput>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-10">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
                  onClick={() => setInput(suggestion)}
                  type="button"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {error && <p className="mt-6 text-center text-sm text-red-400">Something went wrong. Please try again.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
