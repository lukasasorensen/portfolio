"use client";

import { DefaultChatTransport } from "ai";

export const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

export const CHAT_PROMPT_MAX_LENGTH = 2000;

export const CHAT_SUGGESTIONS = [
  "What are Lukas A Sorensen's strongest recent projects?",
  "Summarize Lukas A Sorensen's experience in one paragraph.",
  "Which frontend and backend technologies does Lukas A Sorensen use?",
];
