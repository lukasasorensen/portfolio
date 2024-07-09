"use client";
import { ThemedButton } from "@/components/Themed";
import { useThemeContext } from "@/providers/ThemeProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { twColorClasses } = useThemeContext();

  return (
    <main className={`flex min-h-screen flex-col items-center justify-around ${twColorClasses.BG_PRIMARY} p-24`}>
      <div className="pb-16 text-center">
        <h1 className={`mb-5 text-center text-7xl font-bold ${twColorClasses.TEXT_SECONDARY}`}>Lukas A Sorensen</h1>
        <h2 className={`text-2xl uppercase ${twColorClasses.TEXT_TERTIARY}`}>Full Stack Engineer</h2>
      </div>
    </main>
  );
}
