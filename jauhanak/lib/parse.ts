import { CAREGIVERS, FREQUENCIES, LENGTHS, SIGNS, TOPICS } from "@/lib/types";
import type { ClosenessInput, SignId } from "@/lib/types";

function isOneOf<T extends string>(value: unknown, allowed: readonly T[]): value is T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

function wholeNumber(value: unknown, min: number, max: number): number | null {
  const number = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(number) || number < min || number > max) return null;
  return number;
}

export function parseCloseness(body: unknown): ClosenessInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  if (!isOneOf(raw.caregiver, CAREGIVERS)) return null;
  if (!isOneOf(raw.frequency, FREQUENCIES)) return null;
  if (!isOneOf(raw.length, LENGTHS)) return null;
  if (!isOneOf(raw.topic, TOPICS)) return null;

  const childAge = wholeNumber(raw.childAge, 0, 17);
  const yearsApart = wholeNumber(raw.yearsApart, 0, 25);
  const monthsLeft = wholeNumber(raw.monthsLeft, 0, 60);
  if (childAge === null || yearsApart === null || monthsLeft === null) return null;
  if (yearsApart > childAge) return null;

  if (!Array.isArray(raw.signs) || raw.signs.length === 0 || raw.signs.length > 4) return null;
  const signs: SignId[] = [];
  for (const item of raw.signs) {
    if (!isOneOf(item, SIGNS) || signs.includes(item)) return null;
    signs.push(item);
  }
  if (signs.includes("tidak-ada") && signs.length > 1) return null;

  return {
    childAge,
    yearsApart,
    caregiver: raw.caregiver,
    frequency: raw.frequency,
    length: raw.length,
    topic: raw.topic,
    signs,
    monthsLeft,
  };
}
