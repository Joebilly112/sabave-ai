import {
  MOODS,
  MODES,
  PAINS,
  POSTURES,
  RECOVERIES,
  type Mood,
  type Mode,
  type Pain,
  type Posture,
  type Recovery,
  type StrainInput,
} from "@/lib/types";

function whole(value: unknown, min: number, max: number): number | null {
  const number = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  if (!Number.isFinite(number)) return null;
  const rounded = Math.round(number);
  if (rounded < min || rounded > max) return null;
  return rounded;
}

function halfHour(value: unknown): number | null {
  const number = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  if (!Number.isFinite(number)) return null;
  const doubled = Math.round(number * 2);
  const snapped = doubled / 2;
  if (Math.abs(snapped - number) > 0.01) return null;
  if (snapped < 3 || snapped > 12) return null;
  return snapped;
}

function clock(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value.trim());
  if (!match) return null;
  return `${match[1]}:${match[2]}`;
}

export function parseStrain(body: unknown): StrainInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const minutesOneWay = whole(raw.minutesOneWay, 15, 240);
  const mode = MODES.includes(raw.mode as Mode) ? (raw.mode as Mode) : null;
  const depart = clock(raw.depart);
  const returnAt = clock(raw.returnAt);
  const posture = POSTURES.includes(raw.posture as Posture) ? (raw.posture as Posture) : null;
  const transfers = whole(raw.transfers, 0, 5);
  const sleepHours = halfHour(raw.sleepHours);
  const pain = PAINS.includes(raw.pain as Pain) ? (raw.pain as Pain) : null;
  const mood = MOODS.includes(raw.mood as Mood) ? (raw.mood as Mood) : null;
  const recovery = RECOVERIES.includes(raw.recovery as Recovery) ? (raw.recovery as Recovery) : null;
  if (
    minutesOneWay === null ||
    !mode ||
    !depart ||
    !returnAt ||
    !posture ||
    transfers === null ||
    sleepHours === null ||
    !pain ||
    !mood ||
    !recovery
  ) {
    return null;
  }
  return { minutesOneWay, mode, depart, returnAt, posture, transfers, sleepHours, pain, mood, recovery };
}
