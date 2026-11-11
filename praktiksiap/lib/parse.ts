import {
  GEAR_STATES,
  IBI_STATES,
  PLACE_STATES,
  SIPB_STATES,
  STRB_STATES,
  WASTE_STATES,
  WORKPLACES,
  type CekInput,
  type GearState,
  type IbiState,
  type PlaceState,
  type SipbState,
  type StrbState,
  type WasteState,
  type WorkplaceId,
} from "@/lib/types";

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  if (!cleaned) return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function oneOf<T extends string>(value: unknown, allowed: readonly T[]): T | null {
  if (typeof value !== "string") return null;
  return allowed.includes(value as T) ? (value as T) : null;
}

export function parseCek(body: unknown): CekInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const years = asNumber(raw.years);
  if (years === null || !Number.isInteger(years) || years < 0 || years > 45) return null;

  const workplace = oneOf<WorkplaceId>(raw.workplace, WORKPLACES);
  const strb = oneOf<StrbState>(raw.strb, STRB_STATES);
  const sipb = oneOf<SipbState>(raw.sipb, SIPB_STATES);
  const place = oneOf<PlaceState>(raw.place, PLACE_STATES);
  const gear = oneOf<GearState>(raw.gear, GEAR_STATES);
  const waste = oneOf<WasteState>(raw.waste, WASTE_STATES);
  const ibi = oneOf<IbiState>(raw.ibi, IBI_STATES);
  if (!workplace || !strb || !sipb || !place || !gear || !waste || !ibi) return null;

  return { years, workplace, strb, sipb, place, gear, waste, ibi };
}
