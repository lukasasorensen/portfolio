"use client";

import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
  MessageToolbar,
} from "@/components/ai-elements/message";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ai-elements/reasoning";
import { CopyIcon, RefreshCwIcon } from "lucide-react";
import { Fragment } from "react";
import { isReasoningUIPart, isTextUIPart, isToolUIPart, type UIMessage } from "ai";

import { InlineToolCall } from "./InlineToolCall";
import { hasRenderableMessageContent } from "./chat-utils";

type ChatMessageProps = {
  copyError: string | null;
  isLatestAssistantMessage: boolean;
  message: UIMessage;
  onCopyResponse: (text: string) => void | Promise<void>;
  onRegenerate: () => void | Promise<void>;
};

export function ChatMessage({
  copyError,
  isLatestAssistantMessage,
  message,
  onCopyResponse,
  onRegenerate,
}: ChatMessageProps) {
  const textParts = message.parts.filter(isTextUIPart);
  const reasoningParts = message.parts.filter(isReasoningUIPart);
  const contentParts = message.parts.filter((part) => isTextUIPart(part) || isToolUIPart(part));

  if (!hasRenderableMessageContent(message)) {
    return null;
  }

  const textContent = textParts.map((part) => part.text).join("\n\n");
  const reasoningContent = reasoningParts
    .map((part) => part.text)
    .join("\n\n")
    .trim();
  const isReasoningStreaming = reasoningParts.some((part) => part.state === "streaming");
  const firstTextPartIndex = contentParts.findIndex((part) => isTextUIPart(part));
  const showActions = isLatestAssistantMessage && textParts.length > 0;

  return (
    <Fragment>
      <Message from={message.role}>
        <MessageContent className={message.role === "assistant" ? "max-w-none space-y-4" : undefined}>
          {message.role === "assistant" && reasoningContent && (
            <Reasoning defaultOpen={false} isStreaming={isReasoningStreaming}>
              <ReasoningTrigger />
              <ReasoningContent>{reasoningContent}</ReasoningContent>
            </Reasoning>
          )}
          {message.role === "assistant" ? (
            <div className="flex flex-wrap items-start gap-4">
              {contentParts.map((part, index) => {
                if (isTextUIPart(part)) {
                  return (
                    <div className="w-full" key={`${message.id}-text-${index}`}>
                      {index === firstTextPartIndex && (
                        <div className="bold mt-2 text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-400/75">
                          Assistant
                        </div>
                      )}
                      <MessageResponse>{part.text}</MessageResponse>
                    </div>
                  );
                }

                if (isToolUIPart(part)) {
                  return (
                    <div className="w-full" key={`${message.id}-tool-${index}`}>
                      <InlineToolCall part={part} />
                    </div>
                  );
                }

                return null;
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
            <MessageAction label="Retry response" onClick={() => void onRegenerate()} tooltip="Retry">
              <RefreshCwIcon className="size-3.5" />
            </MessageAction>
            <MessageAction label="Copy response" onClick={() => void onCopyResponse(textContent)} tooltip="Copy">
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
}
