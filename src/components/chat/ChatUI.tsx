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
    <div className="flex h-full flex-col">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto space-y-6 px-2 py-4">
        {messages.length === 0 && (
          <p className={`text-center text-base ${tw.TEXT_PRIMARY} opacity-50 mt-12`}>
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
                className={`max-w-[75%] px-5 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === "user"
                    ? `${tw.BTN_PRIMARY} rounded-3xl rounded-br-md`
                    : `${tw.TEXT_PRIMARY} opacity-90`
                }`}
              >
                {textContent}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`px-5 py-3 text-sm ${tw.TEXT_PRIMARY} opacity-50`}>
              <span className="animate-pulse">●●●</span>
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

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 pt-4 pb-2"
      >
        <input
          className={`flex-1 rounded-full px-5 py-3 text-sm outline-none transition-shadow
            bg-gray-700 text-white placeholder-gray-400
            focus:ring-2 focus:ring-violet-500 focus:ring-offset-1 focus:ring-offset-transparent`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything…"
          disabled={isLoading}
          maxLength={2000}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`shrink-0 rounded-full px-5 py-3 text-sm font-medium transition-opacity ${tw.BTN_PRIMARY} disabled:opacity-30`}
        >
          Send
        </button>
      </form>
    </div>
  );
}
