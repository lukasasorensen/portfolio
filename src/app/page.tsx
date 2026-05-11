"use client";
import dynamic from "next/dynamic";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

const ChatUI = dynamic(() => import("@/components/chat/ChatUI"), { ssr: false });

export default function Home() {
  return (
    <main className={`flex h-full flex-col items-center ${tw.BG_PRIMARY} px-6 pb-6 pt-12`}>
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className={`mb-2 text-5xl font-bold ${tw.TEXT_SECONDARY}`}>Lukas A Sorensen</h1>
        <h2 className={`text-lg uppercase tracking-widest ${tw.TEXT_TERTIARY}`}>Full Stack Engineer</h2>
      </div>

      {/* Chat — front and center */}
      <div className="flex w-full max-w-4xl flex-1 flex-col" style={{ minHeight: "60vh" }}>
        <ChatUI />
      </div>
    </main>
  );
}
