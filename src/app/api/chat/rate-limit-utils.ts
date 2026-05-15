import { NextRequest } from "next/server";

const DEFAULT_BURST_WINDOW_MS = 60_000;
const DEFAULT_BURST_MAX_REQUESTS = 10;
const DEFAULT_DAILY_MAX_REQUESTS = 100;
const MAX_DEVICE_ID_LENGTH = 128;
const COUNTER_CLEANUP_INTERVAL = 200;
const DEVICE_ID_PATTERN = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

type WindowCounter = {
  count: number;
  resetAt: number;
};

type DayCounter = {
  count: number;
  day: string;
};

const burstRequestCounters = new Map<string, WindowCounter>();
const dailyRequestCounters = new Map<string, DayCounter>();
let requestsSinceCounterCleanup = 0;

const parseCsvEnvToSet = (value?: string) =>
  new Set(
    (value ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );

const parsePositiveIntegerEnv = (value: string | undefined, fallback: number) => {
  const normalized = (value ?? "").trim();
  if (!/^\d+$/.test(normalized)) {
    return fallback;
  }

  const parsed = Number.parseInt(normalized, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const RATE_LIMIT_CONFIG = {
  bannedDeviceIds: parseCsvEnvToSet(process.env.CHAT_BANNED_DEVICE_IDS),
  bannedIps: parseCsvEnvToSet(process.env.CHAT_BANNED_IPS),
  burstMaxRequests: parsePositiveIntegerEnv(process.env.CHAT_RATE_LIMIT_MAX_REQUESTS_PER_WINDOW, DEFAULT_BURST_MAX_REQUESTS),
  burstWindowMs: parsePositiveIntegerEnv(process.env.CHAT_RATE_LIMIT_WINDOW_MS, DEFAULT_BURST_WINDOW_MS),
  dailyMaxRequests: parsePositiveIntegerEnv(process.env.CHAT_RATE_LIMIT_MAX_REQUESTS_PER_DAY, DEFAULT_DAILY_MAX_REQUESTS),
};

export const getClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) {
    return cfIp;
  }

  return null;
};

export const getDeviceIdFromRequest = (request: NextRequest) => {
  const headerValue = request.headers.get("x-device-id")?.trim();
  if (
    !headerValue ||
    headerValue.length > MAX_DEVICE_ID_LENGTH ||
    !DEVICE_ID_PATTERN.test(headerValue)
  ) {
    return null;
  }

  return headerValue;
};

export const incrementBurstCounter = (key: string, nowMs: number, windowMs: number): WindowCounter => {
  const current = burstRequestCounters.get(key);

  if (!current || current.resetAt <= nowMs) {
    const next = { count: 1, resetAt: nowMs + windowMs };
    burstRequestCounters.set(key, next);
    return next;
  }

  const next = { ...current, count: current.count + 1 };
  burstRequestCounters.set(key, next);
  return next;
};

export const incrementDayCounter = (key: string, dayKey: string): DayCounter => {
  const current = dailyRequestCounters.get(key);

  if (!current || current.day !== dayKey) {
    const next = { count: 1, day: dayKey };
    dailyRequestCounters.set(key, next);
    return next;
  }

  const next = { ...current, count: current.count + 1 };
  dailyRequestCounters.set(key, next);
  return next;
};

export const getSecondsUntilNextUtcDay = (now: Date) => {
  const nextDay = new Date(now);
  nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  nextDay.setUTCHours(0, 0, 0, 0);
  return Math.max(1, Math.ceil((nextDay.getTime() - now.getTime()) / 1000));
};

export const cleanupExpiredCounters = (nowMs: number, dayKey: string) => {
  requestsSinceCounterCleanup += 1;
  if (requestsSinceCounterCleanup < COUNTER_CLEANUP_INTERVAL) {
    return;
  }

  requestsSinceCounterCleanup = 0;

  for (const [key, counter] of burstRequestCounters) {
    if (counter.resetAt <= nowMs) {
      burstRequestCounters.delete(key);
    }
  }

  for (const [key, counter] of dailyRequestCounters) {
    if (counter.day !== dayKey) {
      dailyRequestCounters.delete(key);
    }
  }
};
