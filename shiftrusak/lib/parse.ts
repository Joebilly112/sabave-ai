import { SHIFT_IDS, SYMPTOM_IDS, type CekInput, type ShiftId, type SymptomId } from "@/lib/types";

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;
  const cleaned = value.trim().replace(",", ".");
  if (!cleaned) return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function parseCek(body: unknown): CekInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  if (!Array.isArray(raw.shifts) || raw.shifts.length !== 14) return null;

  const shifts: ShiftId[] = [];
  for (const item of raw.shifts) {
    if (typeof item !== "string" || !SHIFT_IDS.includes(item as ShiftId)) return null;
    shifts.push(item as ShiftId);
  }

  const commuteMinutes = asNumber(raw.commuteMinutes);
  const sleepHours = asNumber(raw.sleepHours);
  const caffeine = asNumber(raw.caffeine);
  if (commuteMinutes === null || sleepHours === null || caffeine === null) return null;
  if (!Number.isInteger(commuteMinutes) || !inRange(commuteMinutes, 0, 180)) return null;
  if (!inRange(sleepHours, 0, 14)) return null;
  if (Math.round(sleepHours * 2) !== sleepHours * 2) return null;
  if (!Number.isInteger(caffeine) || !inRange(caffeine, 0, 12)) return null;

  if (!Array.isArray(raw.symptoms)) return null;
  const symptoms: SymptomId[] = [];
  for (const item of raw.symptoms) {
    if (typeof item !== "string" || !SYMPTOM_IDS.includes(item as SymptomId)) return null;
    const id = item as SymptomId;
    if (!symptoms.includes(id)) symptoms.push(id);
  }

  return { shifts, commuteMinutes, sleepHours, caffeine, symptoms };
}
