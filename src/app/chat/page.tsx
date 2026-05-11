"use client";
import dynamic from "next/dynamic";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

// Dynamically import ChatUI to keep the bundle lean (client-only, no SSR needed)
const ChatUI = dynamic(() => import("@/components/chat/ChatUI"), { ssr: false });

export default function ChatPage() {
  return (
    <main className={`flex min-h-screen flex-col ${tw.BG_PRIMARY} px-6 py-10`}>
      <div className="mx-auto flex w-full max-w-6xl flex-1">
        <ChatUI />
      </div>
    </main>
  );
}
