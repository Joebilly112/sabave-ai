import { DOCUMENTS, FEE_WHEN, SOURCES, VISAS, YES_NO, YES_NO_UNSURE } from "@/lib/types";
import type { DocumentId, OfferInput } from "@/lib/types";

function isOneOf<T extends string>(value: unknown, allowed: readonly T[]): value is T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

function cleanCountry(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const country = value.trim().replace(/\s+/g, " ");
  if (!/^[\p{L}\s.'-]{2,40}$/u.test(country)) return null;
  return country;
}

export function parseOffer(body: unknown): OfferInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  if (!isOneOf(raw.source, SOURCES)) return null;
  if (!isOneOf(raw.visa, VISAS)) return null;
  if (!isOneOf(raw.feeWhen, FEE_WHEN)) return null;
  if (!isOneOf(raw.loan, YES_NO)) return null;
  if (!isOneOf(raw.siskoOwn, YES_NO_UNSURE)) return null;
  if (!isOneOf(raw.contractShown, YES_NO)) return null;

  const country = cleanCountry(raw.country);
  if (!country) return null;

  const feeIdr = typeof raw.feeIdr === "number" ? raw.feeIdr : Number(raw.feeIdr);
  if (!Number.isInteger(feeIdr) || feeIdr < 0 || feeIdr > 250_000_000) return null;
  if (raw.feeWhen === "tidak-diminta" && feeIdr !== 0) return null;
  if (raw.feeWhen !== "tidak-diminta" && feeIdr <= 0) return null;

  if (!Array.isArray(raw.documents) || raw.documents.length === 0 || raw.documents.length > 2) return null;
  const documents: DocumentId[] = [];
  for (const item of raw.documents) {
    if (!isOneOf(item, DOCUMENTS) || documents.includes(item)) return null;
    documents.push(item);
  }
  if (documents.includes("tidak-ada") && documents.length > 1) return null;

  return {
    source: raw.source,
    country,
    visa: raw.visa,
    feeIdr,
    feeWhen: raw.feeWhen,
    loan: raw.loan,
    documents,
    siskoOwn: raw.siskoOwn,
    contractShown: raw.contractShown,
  };
}
