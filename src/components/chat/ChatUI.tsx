"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isTextUIPart } from "ai";
import { useRef, useEffect, useState, FormEvent } from "react";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

const transport = new DefaultChatTransport({ api: "/api/chat" });

export default function ChatUI() {
  const { messages, sendMessage, status, error } = useChat({ transport });
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    sendMessage({ text });
    setInput("");
  }

  return (
    <div className={`flex h-full flex-col rounded-lg ${tw.BG_SECONDARY} shadow-lg`}>
      {/* Message list */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.length === 0 && (
          <p className={`text-center text-sm ${tw.TEXT_PRIMARY} opacity-60 mt-8`}>
            Ask me anything about Lukas A Sorensen&apos;s work and skills!
          </p>
        )}
        {messages.map((m) => {
          const textContent = m.parts
            .filter(isTextUIPart)
            .map((p) => p.text)
            .join("");
          if (!textContent) return null;
          return (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === "user"
                    ? `${tw.BTN_PRIMARY} rounded-br-sm`
                    : `${tw.BG_PRIMARY} ${tw.TEXT_PRIMARY} rounded-bl-sm`
                }`}
              >
                {textContent}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`rounded-2xl rounded-bl-sm px-4 py-2 text-sm ${tw.BG_PRIMARY} ${tw.TEXT_PRIMARY}`}>
              <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
        {error && (
          <p className="text-center text-sm text-red-500">
            Something went wrong. Please try again.
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        className={`flex items-center gap-2 border-t border-gray-600 p-3`}
      >
        <input
          className={`flex-1 rounded-lg bg-gray-700 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-500`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          disabled={isLoading}
          maxLength={2000}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-opacity ${tw.BTN_PRIMARY} disabled:opacity-40`}
        >
          Send
        </button>
      </form>
    </div>
  );
}
