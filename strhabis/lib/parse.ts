import { PLACE_IDS, SIP_IDS, type CekInput, type PlaceId, type SipId } from "@/lib/types";

const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function parseIsoDate(value: string): Date | null {
  if (!DATE.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return null;
  }
  return date;
}

export function jakartaToday(): Date {
  const shifted = new Date(Date.now() + 7 * 60 * 60 * 1000);
  return new Date(Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate()));
}

function asInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return Math.trunc(value);
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  if (!/^\d+$/.test(cleaned)) return null;
  return Number(cleaned);
}

export function parseCek(body: unknown): CekInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  if (typeof raw.issuedOn !== "string" || typeof raw.expiresOn !== "string") return null;
  const issued = parseIsoDate(raw.issuedOn);
  const expires = parseIsoDate(raw.expiresOn);
  if (!issued || !expires || expires.getTime() < issued.getTime()) return null;

  const today = jakartaToday();
  const oldest = Date.UTC(today.getUTCFullYear() - 15, today.getUTCMonth(), today.getUTCDate());
  const farthest = Date.UTC(today.getUTCFullYear() + 10, today.getUTCMonth(), today.getUTCDate());
  if (issued.getTime() < oldest || expires.getTime() > farthest) return null;

  if (typeof raw.sip !== "string" || !SIP_IDS.includes(raw.sip as SipId)) return null;
  if (typeof raw.place !== "string" || !PLACE_IDS.includes(raw.place as PlaceId)) return null;

  const skp = asInt(raw.skp);
  if (skp === null || skp < 0 || skp > 200) return null;

  return {
    issuedOn: raw.issuedOn,
    expiresOn: raw.expiresOn,
    sip: raw.sip as SipId,
    place: raw.place as PlaceId,
    skp,
  };
}
