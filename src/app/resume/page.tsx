"use client";
import ResumeTimeline from "@/components/resume/ResumeTimeline";
import { useThemeContext } from "@/providers/ThemeProvider";

export default function Resume() {
  const { twColorClasses } = useThemeContext();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-around ${twColorClasses.BG_PRIMARY} px-8 py-12 md:px-24`}
    >
      <div className="flex max-w-screen-lg flex-col items-center">
        <h1 className={`mb-10 text-center text-4xl font-bold ${twColorClasses.TEXT_SECONDARY}`}>My Resume</h1>
        <p className="mb-3 max-w-screen-md">
          Lukas Sorensen is an experienced Full Stack Web Developer with over 10 years of expertise in writing SOLID,
          maintainable, and extendable code. Passionate about continuous learning, communicative and adept at
          problem-solving.
        </p>
        <ResumeTimeline />
      </div>
    </main>
  );
}
