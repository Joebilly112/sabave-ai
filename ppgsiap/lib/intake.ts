import { ATTEMPTS, DOCUMENTS, EDUCATION, EMPLOYMENT, type DocumentId, type Intake } from "@/lib/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseIntake(body: unknown): Intake | null {
  if (!isRecord(body)) return null;
  const employment = EMPLOYMENT.find((item) => item.id === body.employment)?.id;
  const education = EDUCATION.find((item) => item.id === body.education)?.id;
  const attempts = ATTEMPTS.find((item) => item.id === body.attempts)?.id;
  const years = typeof body.years === "number" ? body.years : Number(body.years);
  if (!employment || !education || attempts === undefined) return null;
  if (!Number.isInteger(years) || years < 0 || years > 45) return null;

  const rawDocs = isRecord(body.documents) ? body.documents : null;
  if (!rawDocs) return null;
  const documents = {} as Record<DocumentId, boolean>;
  for (const doc of DOCUMENTS) {
    const value = rawDocs[doc.id];
    if (typeof value !== "boolean") return null;
    documents[doc.id] = value;
  }

  return { employment, years, education, attempts, documents };
}

export function labelOf<T extends { id: string | number; label: string }>(list: readonly T[], id: T["id"]): string {
  return list.find((item) => item.id === id)?.label ?? "";
}
