"use client";

import { Message, MessageContent } from "@/components/ai-elements/message";

export function ChatLoadingMessage() {
  return (
    <Message from="assistant">
      <MessageContent className="max-w-none space-y-3">
        <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-400/75">Assistant</div>
        <div
          aria-live="polite"
          aria-label="Assistant is responding"
          className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-4 py-3 text-white/70 shadow-sm"
          role="status"
        >
          <span className="sr-only">Assistant is responding</span>
          <span className="size-2 rounded-full bg-cyan-300/80 motion-safe:animate-bounce" />
          <span className="size-2 rounded-full bg-cyan-300/80 motion-safe:animate-bounce [animation-delay:150ms]" />
          <span className="size-2 rounded-full bg-cyan-300/80 motion-safe:animate-bounce [animation-delay:300ms]" />
        </div>
      </MessageContent>
    </Message>
  );
}
