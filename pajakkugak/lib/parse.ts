import { NPWP_STATUSES, OMZET_BANDS, WITHHELD, type CekInput, type NpwpStatus, type OmzetBand, type Withheld } from "@/lib/types";

function asEnum<T extends string>(value: unknown, allowed: readonly T[]): T | null {
  if (typeof value !== "string") return null;
  return allowed.includes(value as T) ? (value as T) : null;
}

function asGross(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return normalize(value);
  }
  if (typeof value !== "string") return null;
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return null;
  return normalize(Number(digits));
}

function normalize(value: number): number | null {
  if (!Number.isInteger(value) || value < 0 || value > 100_000_000_000) return null;
  return value;
}

export function parseCek(body: unknown): CekInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const annualGross = asGross(raw.annualGross);
  const hasNpwp = asEnum<NpwpStatus>(raw.hasNpwp, NPWP_STATUSES);
  const withheld = asEnum<Withheld>(raw.withheld, WITHHELD);
  const omzetBand = asEnum<OmzetBand>(raw.omzetBand, OMZET_BANDS);
  if (annualGross === null || !hasNpwp || !withheld || !omzetBand) return null;
  return { annualGross, hasNpwp, withheld, omzetBand };
}
