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
          Lukas Sorensen is a Lead Engineer / Systems Architect with 10+ years of experience delivering production
          software and a 50/50 focus on AI systems and full-stack engineering.
        </p>
        <a
          href="/Lukas_A_Sorensen_Resume.pdf"
          download
          className={`mb-8 rounded-md bg-violet-600 px-4 py-2 font-semibold ${tw.TEXT_PRIMARY} hover:bg-violet-700`}
        >
          Download Resume as PDF
        </a>
        <ResumeTimeline />
      </div>
    </main>
  );
}
