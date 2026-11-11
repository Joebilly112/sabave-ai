import { BACKUP_IDS, SYMPTOM_IDS, type BackupId, type CekInput, type SymptomId } from "@/lib/types";

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;
  const cleaned = value.trim().replace(",", ".");
  if (!/^\d+(\.\d)?$/.test(cleaned)) return null;
  return Number(cleaned);
}

function asInt(value: unknown): number | null {
  const number = asNumber(value);
  if (number === null || !Number.isInteger(number)) return null;
  return number;
}

export function parseCek(body: unknown): CekInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;

  const nightsOnCall = asInt(raw.nightsOnCall);
  const birthsAfterMidnight = asInt(raw.birthsAfterMidnight);
  const sleepHours = asNumber(raw.sleepHours);
  if (nightsOnCall === null || nightsOnCall < 0 || nightsOnCall > 14) return null;
  if (birthsAfterMidnight === null || birthsAfterMidnight < 0 || birthsAfterMidnight > 40) return null;
  if (sleepHours === null || sleepHours < 0 || sleepHours > 12) return null;
  if (typeof raw.backup !== "string" || !BACKUP_IDS.includes(raw.backup as BackupId)) return null;
  if (!Array.isArray(raw.symptoms)) return null;

  const symptoms: SymptomId[] = [];
  for (const item of raw.symptoms) {
    if (typeof item !== "string" || !SYMPTOM_IDS.includes(item as SymptomId)) return null;
    if (!symptoms.includes(item as SymptomId)) symptoms.push(item as SymptomId);
  }
  if (symptoms.length > SYMPTOM_IDS.length) return null;

  return {
    nightsOnCall,
    birthsAfterMidnight,
    sleepHours,
    backup: raw.backup as BackupId,
    symptoms,
  };
}
