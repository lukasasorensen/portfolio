"use client";
import LyricTextEditor from "@/components/LyricTextEditor";
import LyricEditor from "@/components/Lyrics/LyricEditor";
import { ThemedButton } from "@/components/Themed";
import { darkHallowLyrics } from "@/example-data/ExampleLyrics";
import { ILyrics } from "@/interfaces/Lyrics";
import { useThemeContext } from "@/providers/ThemeProvider";
import { useState } from "react";

export default function Editor() {
  const { twColorClasses } = useThemeContext();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-around ${twColorClasses.BG_PRIMARY} p-24`}
    >
      <h1
        className={`mb-10 text-center text-4xl font-bold ${twColorClasses.TEXT_SECONDARY}`}
      >
        Lukas A Sorensen
      </h1>
    </main>
  );
}
