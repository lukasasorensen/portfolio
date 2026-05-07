"use client";
import dynamic from "next/dynamic";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

// Dynamically import ChatUI to keep the bundle lean (client-only, no SSR needed)
const ChatUI = dynamic(() => import("@/components/chat/ChatUI"), { ssr: false });

export default function ChatPage() {
  return (
    <main className={`flex min-h-screen flex-col items-center ${tw.BG_PRIMARY} px-6 pb-6 pt-12`}>
      <h1 className={`mb-2 text-center text-4xl font-bold ${tw.TEXT_SECONDARY}`}>Chat with AI</h1>
      <p className={`mb-8 text-center text-sm ${tw.TEXT_PRIMARY} opacity-60`}>
        Ask me about Lukas A Sorensen&apos;s projects, skills, and experience.
      </p>
      <div className="flex w-full max-w-4xl flex-1 flex-col" style={{ minHeight: "60vh" }}>
        <ChatUI />
      </div>
    </main>
  );
}
