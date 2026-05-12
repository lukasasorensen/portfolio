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
          className="relative inline-flex min-w-[12rem] overflow-hidden rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 shadow-sm backdrop-blur-md"
          role="status"
        >
          <span className="sr-only">Assistant is responding</span>
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.04)_35%,rgba(255,255,255,0.16)_50%,rgba(255,255,255,0.04)_65%,transparent_100%)] motion-reduce:hidden loading-shimmer" />
          <span className="relative font-medium tracking-[0.01em]">Thinking...</span>
        </div>
        <style jsx>{`
          .loading-shimmer {
            transform: translateX(-160%);
            animation: loading-shimmer 2.2s ease-in-out infinite;
          }

          @keyframes loading-shimmer {
            from {
              transform: translateX(-160%);
            }

            to {
              transform: translateX(160%);
            }
          }
        `}</style>
      </MessageContent>
    </Message>
  );
}
