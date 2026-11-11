import { daysBetween, parseIsoDate } from "@/lib/dates";
import { SIPB_COUNTS, WORKPLACES, type CekInput, type SipbCount, type WorkplaceId } from "@/lib/types";

function asDate(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return parseIsoDate(trimmed) ? trimmed : null;
}

function asSkp(value: unknown): number | null {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value.trim()) : NaN;
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed < 0 || parsed > 200) return null;
  return parsed;
}

function asCount(value: unknown): SipbCount | null {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return SIPB_COUNTS.includes(parsed as SipbCount) ? (parsed as SipbCount) : null;
}

export function parseCek(body: unknown): CekInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const strbIssued = asDate(raw.strbIssued);
  const strbExpiry = asDate(raw.strbExpiry);
  const sipbCount = asCount(raw.sipbCount);
  const workplace = typeof raw.workplace === "string" && WORKPLACES.includes(raw.workplace as WorkplaceId)
    ? (raw.workplace as WorkplaceId)
    : null;
  const skp = asSkp(raw.skp);
  if (!strbIssued || !strbExpiry || !sipbCount || !workplace || skp === null) return null;

  const span = daysBetween(strbIssued, strbExpiry);
  if (span === null || span < 30 || span > 365 * 12) return null;

  const issuedYear = Number(strbIssued.slice(0, 4));
  const thisYear = new Date().getUTCFullYear();
  if (issuedYear < thisYear - 20 || issuedYear > thisYear + 1) return null;

  return { strbIssued, strbExpiry, sipbCount, workplace, skp };
}
