"use client";

import { DefaultChatTransport } from "ai";

const CHAT_DEVICE_ID_STORAGE_KEY = "chat-device-id";

const createDeviceId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID().replaceAll("-", "");
  }

  return `device-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
};

const getOrCreateDeviceId = () => {
  if (typeof window === "undefined") {
    return "server";
  }

  const existing = window.localStorage.getItem(CHAT_DEVICE_ID_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const nextDeviceId = createDeviceId();
  window.localStorage.setItem(CHAT_DEVICE_ID_STORAGE_KEY, nextDeviceId);
  return nextDeviceId;
};

export const chatTransport = new DefaultChatTransport({
  api: "/api/chat",
  headers: () => ({
    "x-device-id": getOrCreateDeviceId(),
  }),
});

export const CHAT_PROMPT_MAX_LENGTH = 2000;

export const CHAT_SUGGESTIONS = [
  "Summarize Lukas Sorensen's experience in one paragraph.",
  "What is Lukas Sorensen's experience with AI?",
  "Which technologies does Lukas A Sorensen primarily use?",
];
