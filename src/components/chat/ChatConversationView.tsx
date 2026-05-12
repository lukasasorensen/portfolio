"use client";

import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import type { ChatStatus, UIMessage } from "ai";
import type { Ref } from "react";

import { ChatMessageList } from "./ChatMessageList";
import { ChatPromptInput } from "./ChatPromptInput";

type ChatConversationViewProps = {
  bottomRef: Ref<HTMLDivElement>;
  copyError: string | null;
  hasError: boolean;
  input: string;
  isLoading: boolean;
  lastAssistantMessageId?: string;
  messages: UIMessage[];
  status: ChatStatus;
  onCopyResponse: (text: string) => void | Promise<void>;
  onInputChange: (value: string) => void;
  onNewChat: () => void;
  onRegenerate: () => void | Promise<void>;
  onStop: () => void;
  onSubmit: (message: PromptInputMessage) => void;
};

export function ChatConversationView({
  bottomRef,
  copyError,
  hasError,
  input,
  isLoading,
  lastAssistantMessageId,
  messages,
  status,
  onCopyResponse,
  onInputChange,
  onNewChat,
  onRegenerate,
  onStop,
  onSubmit,
}: ChatConversationViewProps) {
  return (
    <div className="flex h-full min-h-[70vh] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between gap-10 border-b border-white/10 px-6 py-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-400/80">AI Chat</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Ask about Lukas</h1>
        </div>
        <button
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
          onClick={onNewChat}
          type="button"
        >
          New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-10 py-6">
        <ChatMessageList
          bottomRef={bottomRef}
          copyError={copyError}
          lastAssistantMessageId={lastAssistantMessageId}
          messages={messages}
          onCopyResponse={onCopyResponse}
          onRegenerate={onRegenerate}
        />
      </div>

      <div className="border-t border-white/10 bg-slate-950/95 p-4">
        <ChatPromptInput
          className="mx-auto w-full max-w-3xl"
          input={input}
          isLoading={isLoading}
          onInputChange={onInputChange}
          onStop={onStop}
          onSubmit={onSubmit}
          placeholder="Ask a follow-up..."
          status={status}
          textareaClassName="max-h-40 min-h-[3.25rem]"
        />
        {hasError && <p className="mt-3 text-center text-sm text-red-400">Something went wrong. Please try again.</p>}
      </div>
    </div>
  );
}
