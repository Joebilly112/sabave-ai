import { FLAGS, FOUND, PAYMENTS, REVISIONS, type Flag, type KasusInput } from "@/lib/types";

function isOneOf<T extends string>(value: unknown, options: readonly T[]): value is T {
  return typeof value === "string" && (options as readonly string[]).includes(value);
}

export function parseKasus(body: unknown): KasusInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  if (!isOneOf(raw.foundVia, FOUND)) return null;
  if (!isOneOf(raw.revision, REVISIONS)) return null;
  if (!isOneOf(raw.payment, PAYMENTS)) return null;
  if (typeof raw.hasContract !== "boolean") return null;

  const dp = raw.dpPercent;
  if (typeof dp !== "number" || !Number.isInteger(dp) || dp < 0 || dp > 100) return null;

  if (!Array.isArray(raw.flags) || raw.flags.length > FLAGS.length) return null;
  const flags: Flag[] = [];
  for (const flag of raw.flags) {
    if (!isOneOf(flag, FLAGS) || flags.includes(flag)) return null;
    flags.push(flag);
  }

  return {
    foundVia: raw.foundVia,
    dpPercent: dp,
    hasContract: raw.hasContract,
    revision: raw.revision,
    payment: raw.payment,
    flags,
  };
}
