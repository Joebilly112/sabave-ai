import {
  ABUSES,
  DAY_OFFS,
  DEBTS,
  MOODS,
  PASSPORTS,
  SECTORS,
  WAGES,
  type StayInput,
} from "@/lib/types";

function oneOf<T extends string>(value: unknown, allowed: readonly T[]): T | null {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : null;
}

function months(value: unknown, max: number): number | null {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0 || value > max) return null;
  return value;
}

export function parseStay(body: unknown): StayInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const country = typeof raw.country === "string" ? raw.country.replace(/\s+/g, " ").trim() : "";
  if (country.length < 2 || country.length > 40) return null;
  if (!/^[\p{L}\s.'-]+$/u.test(country)) return null;

  const sector = oneOf(raw.sector, SECTORS);
  const wage = oneOf(raw.wage, WAGES);
  const dayOff = oneOf(raw.dayOff, DAY_OFFS);
  const passport = oneOf(raw.passport, PASSPORTS);
  const abuse = oneOf(raw.abuse, ABUSES);
  const mood = oneOf(raw.mood, MOODS);
  const debt = oneOf(raw.debt, DEBTS);
  const monthsWorked = months(raw.monthsWorked, 120);
  const monthsLeft = months(raw.monthsLeft, 48);
  if (!sector || !wage || !dayOff || !passport || !abuse || !mood || !debt) return null;
  if (monthsWorked === null || monthsLeft === null) return null;

  return { country, sector, monthsWorked, monthsLeft, wage, dayOff, passport, abuse, mood, debt };
}
