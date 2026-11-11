import { PLATFORMS, SUSPEND_TYPES, type CekInput, type PlatformId, type SuspendType } from "@/lib/types";

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;
  const cleaned = value.trim().replace(",", ".");
  if (!cleaned) return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function isPlatform(value: unknown): value is PlatformId {
  return typeof value === "string" && (PLATFORMS as readonly string[]).includes(value);
}

function isSuspend(value: unknown): value is SuspendType {
  return typeof value === "string" && (SUSPEND_TYPES as readonly string[]).includes(value);
}

export function parseCek(body: unknown): CekInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  if (!isPlatform(raw.platform) || !isSuspend(raw.suspendType)) return null;

  const reason = typeof raw.reason === "string" ? raw.reason.trim().slice(0, 400) : "";
  const warnings = asNumber(raw.warnings);
  if (warnings === null || warnings < 0 || warnings > 12 || !Number.isInteger(warnings)) return null;

  const daysUnknown = raw.daysUnknown === true;
  let daysLeft: number | null = null;
  if (!daysUnknown) {
    const parsedDays = asNumber(raw.daysLeft);
    if (parsedDays === null || parsedDays < 0 || parsedDays > 30 || !Number.isInteger(parsedDays)) return null;
    daysLeft = parsedDays;
  }

  return {
    platform: raw.platform,
    suspendType: raw.suspendType,
    reason,
    daysLeft,
    warnings,
  };
}
