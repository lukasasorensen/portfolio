"use client";
import { ThemedButton } from "@/components/Themed";
import { useRouter } from "next/navigation";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function Home() {
  const router = useRouter();

  return (
    <main className={`flex min-h-screen flex-col items-center justify-around ${tw.BG_PRIMARY} p-24`}>
      <div className="pb-16 text-center">
        <h1 className={`mb-5 text-center text-7xl font-bold ${tw.TEXT_SECONDARY}`}>Lukas A Sorensen</h1>
        <h2 className={`text-2xl uppercase ${tw.TEXT_TERTIARY}`}>Full Stack Engineer</h2>
      </div>
      <div className="flex w-full max-w-screen-sm justify-evenly flex-wrap">
        <ThemedButton color="primary" className="text-2xl mb-5" text="Resume" onClick={() => router.push("/resume")} />
        <ThemedButton color="secondary" className="text-2xl mb-5" text="Contact" onClick={() => router.push("/contact")} />
      </div>
    </main>
  );
}
