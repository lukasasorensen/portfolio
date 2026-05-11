"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isTextUIPart } from "ai";
import { useRef, useEffect, useState, FormEvent } from "react";
import Image from "next/image";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { FaPaperPlane } from "react-icons/fa";
import Markdown from "react-markdown";

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
      <div className="flex-1 space-y-6 overflow-y-auto px-2 py-4">
        {messages.length === 0 && (
          <p className={`text-center text-base ${tw.TEXT_PRIMARY} mt-12 opacity-50`}>
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
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] whitespace-pre-wrap px-5 py-3 text-sm leading-relaxed ${
                  m.role === "user" ? `${tw.BTN_PRIMARY} rounded-3xl rounded-br-md` : `${tw.TEXT_PRIMARY} opacity-90`
                }`}
              >
                <Markdown className="markdown">{textContent}</Markdown>
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
        {error && <p className="text-center text-sm text-red-500">Something went wrong. Please try again.</p>}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3 pb-2 pt-4">
        <Image src="/ai.svg" alt="" width={20} height={20} />
        <input
          name="aiPromptInput"
          className={`flex-1 border-b border-violet-500 bg-transparent px-5 py-3 text-sm text-white
            placeholder-gray-400 outline-none transition `}
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
          aria-label="Ask AI"
          className={`flex gap-3 rounded-md p-3 text-white transition-opacity ${tw.BTN_PRIMARY} disabled:opacity-30`}
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}
