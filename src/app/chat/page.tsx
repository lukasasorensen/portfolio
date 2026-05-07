"use client";
import dynamic from "next/dynamic";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

// Dynamically import ChatUI to keep the bundle lean (client-only, no SSR needed)
const ChatUI = dynamic(() => import("@/components/chat/ChatUI"), { ssr: false });

export default function ChatPage() {
  return (
    <main className={`flex min-h-screen flex-col items-center ${tw.BG_PRIMARY} px-4 py-14`}>
      <h1 className={`mb-6 text-center text-4xl font-bold ${tw.TEXT_SECONDARY}`}>Chat with AI</h1>
      <p className={`mb-8 text-center text-sm ${tw.TEXT_PRIMARY} opacity-70 max-w-md`}>
        Ask me about Lukas A Sorensen&apos;s projects, skills, and experience. Powered by OpenAI via LangChain.
      </p>
      <div className="w-full max-w-2xl" style={{ height: "60vh" }}>
        <ChatUI />
      </div>
    </main>
  );
}
