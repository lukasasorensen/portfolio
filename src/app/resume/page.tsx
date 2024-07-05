"use client";
import ResumeTimeline from "@/components/ResumeTimeline";
import { useThemeContext } from "@/providers/ThemeProvider";

export default function Resume() {
  const { twColorClasses } = useThemeContext();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-around ${twColorClasses.BG_PRIMARY} p-24`}
    >
      <h1
        className={`mb-10 text-center text-4xl font-bold ${twColorClasses.TEXT_SECONDARY}`}
      >
        My Resume
      </h1>
      <p className="px-24 mb-3">
        Lukas Sorensen is an experienced Full Stack Web Developer with over 10 years of
        expertise in writing SOLID, maintainable, and extendable code. Passionate about
        continuous learning, communicative and adept at problem-solving.
      </p>
      <ResumeTimeline />
    </main>
  );
}
