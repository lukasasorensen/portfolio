import { NextRequest, NextResponse } from "next/server";
import {
  cleanupExpiredCounters,
  getClientIp,
  getDeviceIdFromRequest,
  getSecondsUntilNextUtcDay,
  incrementBurstCounter,
  incrementDayCounter,
  RATE_LIMIT_CONFIG,
} from "./rate-limit-utils";

export const enforceChatRateLimit = (request: NextRequest) => {
  const now = new Date();
  const nowMs = now.getTime();
  const dayKey = now.toISOString().slice(0, 10);

  cleanupExpiredCounters(nowMs, dayKey);

  const clientIp = getClientIp(request);
  const deviceId = getDeviceIdFromRequest(request);

  if (clientIp && RATE_LIMIT_CONFIG.bannedIps.has(clientIp)) {
    return NextResponse.json({ error: "Access denied for this IP address." }, { status: 403 });
  }

  if (deviceId && RATE_LIMIT_CONFIG.bannedDeviceIds.has(deviceId)) {
    return NextResponse.json({ error: "Access denied for this device." }, { status: 403 });
  }

  if (!clientIp && !deviceId) {
    return NextResponse.json(
      { error: "Request rejected: no client IP or device identifier could be determined." },
      { status: 400 },
    );
  }

  const identityKeys = new Set<string>();
  if (clientIp) {
    identityKeys.add(`ip:${clientIp}`);
  }
  if (deviceId) {
    identityKeys.add(`device:${deviceId}`);
  }
  if (clientIp && deviceId) {
    identityKeys.add(`pair:${clientIp}:${deviceId}`);
  }

  for (const key of identityKeys) {
    const burstCounter = incrementBurstCounter(key, nowMs, RATE_LIMIT_CONFIG.burstWindowMs);
    if (burstCounter.count > RATE_LIMIT_CONFIG.burstMaxRequests) {
      const retryAfterSeconds = Math.max(1, Math.ceil((burstCounter.resetAt - nowMs) / 1000));
      return NextResponse.json(
        {
          error: "Too many requests in a short period. Please wait and try again.",
        },
        {
          headers: { "Retry-After": String(retryAfterSeconds) },
          status: 429,
        },
      );
    }

    const dayCounter = incrementDayCounter(key, dayKey);
    if (dayCounter.count > RATE_LIMIT_CONFIG.dailyMaxRequests) {
      return NextResponse.json(
        {
          error: "Daily usage limit reached. Please try again tomorrow.",
        },
        {
          headers: { "Retry-After": String(getSecondsUntilNextUtcDay(now)) },
          status: 429,
        },
      );
    }
  }

  return null;
};
