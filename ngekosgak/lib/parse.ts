import { MODES, PERKS, type CommuteInput, type Mode, type Perk } from "@/lib/types";

function text(value: unknown, min: number, max: number): string | null {
  if (typeof value !== "string") return null;
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length < min || clean.length > max) return null;
  return clean;
}

function whole(value: unknown, min: number, max: number): number | null {
  const number = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  if (!Number.isFinite(number)) return null;
  const rounded = Math.round(number);
  if (rounded < min || rounded > max) return null;
  return rounded;
}

export function parseCommute(body: unknown): CommuteInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const homeArea = text(raw.homeArea, 2, 60);
  const officeArea = text(raw.officeArea, 2, 60);
  const mode = MODES.includes(raw.mode as Mode) ? (raw.mode as Mode) : null;
  const minutesOneWay = whole(raw.minutesOneWay, 15, 240);
  const dailyCost = whole(raw.dailyCost, 0, 500_000);
  const officeDays = whole(raw.officeDays, 1, 6);
  const takeHome = whole(raw.takeHome, 1_000_000, 80_000_000);
  const kosBudget = whole(raw.kosBudget, 0, 15_000_000);
  if (!homeArea || !officeArea || !mode || minutesOneWay === null || dailyCost === null || officeDays === null || takeHome === null || kosBudget === null) {
    return null;
  }

  const perksRaw = Array.isArray(raw.perks) ? raw.perks : [];
  const perks: Perk[] = [];
  for (const item of perksRaw) {
    if (PERKS.includes(item as Perk) && !perks.includes(item as Perk)) perks.push(item as Perk);
  }

  return { homeArea, officeArea, mode, minutesOneWay, dailyCost, officeDays, takeHome, kosBudget, perks };
}
