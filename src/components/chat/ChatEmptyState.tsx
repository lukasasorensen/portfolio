"use client";

import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import type { ChatStatus } from "ai";
import Image from "next/image";

import { ChatPromptInput } from "./ChatPromptInput";
import { CHAT_SUGGESTIONS } from "./chat-config";

type ChatEmptyStateProps = {
  hasError: boolean;
  input: string;
  isLoading: boolean;
  status: ChatStatus;
  onInputChange: (value: string) => void;
  onStop: () => void;
  onSubmit: (message: PromptInputMessage) => void;
};

export function ChatEmptyState({
  hasError,
  input,
  isLoading,
  status,
  onInputChange,
  onStop,
  onSubmit,
}: ChatEmptyStateProps) {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center">
        <h2 className="flex text-xl font-semibold tracking-tight text-white sm:text-5xl">
          <Image alt="ai logo" className="h-10 w-auto" height={20} src="/ai.svg" width={20} /> Ask AI anything about
          me!
        </h2>

        <ChatPromptInput
          className="mt-10 w-full max-w-2xl"
          input={input}
          isLoading={isLoading}
          onInputChange={onInputChange}
          onStop={onStop}
          onSubmit={onSubmit}
          placeholder="Ask about projects, experience, or technical skills..."
          status={status}
          textareaClassName="max-h-40 min-h-[4rem] text-base"
        />

        <div className="mt-6 flex flex-wrap items-center justify-center gap-10">
          {CHAT_SUGGESTIONS.map((suggestion) => (
            <button
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
              key={suggestion}
              onClick={() => onInputChange(suggestion)}
              type="button"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {hasError && <p className="mt-6 text-center text-sm text-red-400">Something went wrong. Please try again.</p>}
      </div>
    </div>
  );
}
