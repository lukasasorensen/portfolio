"use client";
import { ILyrics } from "@/interfaces/Lyrics";
import { ReactNode, createContext, useReducer } from "react";

export const LyricsContext = createContext(null);
export const LyricsDispatchContext = createContext(null);

export default function LyricsProvider({ children }: { children: ReactNode }) {
  const [lyrics, dispatch] = useReducer(lyricsReducer, {} as ILyrics);

  return (
    <LyricsContext.Provider value={lyrics}>
      <LyricsDispatchContext.Provider value={dispatch}>
        {children}
      </LyricsDispatchContext.Provider>
    </LyricsContext.Provider>
  );
}

function lyricsReducer(lyrics: ILyrics, action: any) {
  switch (action.type) {
    case "updateSectionByName": {
      if (lyrics.sections[action.sectionName]) {
        lyrics.sections[action.sectionName] = action.section;
      }

      return lyrics;
    }
  }
}
