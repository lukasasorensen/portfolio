"use client";

import type { UIMessage } from "ai";
import type { Ref } from "react";

import { ChatMessage } from "./ChatMessage";

type ChatMessageListProps = {
  bottomRef: Ref<HTMLDivElement>;
  copyError: string | null;
  lastAssistantMessageId?: string;
  messages: UIMessage[];
  onCopyResponse: (text: string) => void | Promise<void>;
  onRegenerate: () => void | Promise<void>;
};

export function ChatMessageList({
  bottomRef,
  copyError,
  lastAssistantMessageId,
  messages,
  onCopyResponse,
  onRegenerate,
}: ChatMessageListProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
      {messages.map((message) => (
        <ChatMessage
          copyError={copyError}
          isLatestAssistantMessage={lastAssistantMessageId === message.id}
          key={message.id}
          message={message}
          onCopyResponse={onCopyResponse}
          onRegenerate={onRegenerate}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
