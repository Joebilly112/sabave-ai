import { SYMPTOM_IDS, type CekInput, type SymptomId } from "@/lib/types";

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
  const hoursWeek = asNumber(raw.hoursWeek);
  const activeClients = asNumber(raw.activeClients);
  const sleepHours = asNumber(raw.sleepHours);
  const daysOff = asNumber(raw.daysOff);
  if (hoursWeek === null || activeClients === null || sleepHours === null || daysOff === null) return null;
  if (!Number.isInteger(hoursWeek) || !inRange(hoursWeek, 1, 112)) return null;
  if (!Number.isInteger(activeClients) || !inRange(activeClients, 1, 30)) return null;
  if (!inRange(sleepHours, 0, 14)) return null;
  if (Math.round(sleepHours * 2) !== sleepHours * 2) return null;
  if (!Number.isInteger(daysOff) || !inRange(daysOff, 0, 31)) return null;

  if (!Array.isArray(raw.symptoms)) return null;
  const symptoms: SymptomId[] = [];
  for (const item of raw.symptoms) {
    if (typeof item !== "string" || !SYMPTOM_IDS.includes(item as SymptomId)) return null;
    const id = item as SymptomId;
    if (!symptoms.includes(id)) symptoms.push(id);
  }
  return { hoursWeek, activeClients, sleepHours, daysOff, symptoms };
}
