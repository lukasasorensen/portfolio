"use client";
import ResumeTimeline from "@/components/resume/ResumeTimeline";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function Resume() {
   

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-around ${tw.BG_PRIMARY} px-8 py-12 md:px-24`}
    >
      <div className="flex max-w-screen-lg flex-col items-center">
        <h1 className={`mb-10 text-center text-4xl font-bold ${tw.TEXT_SECONDARY}`}>My Resume</h1>
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
