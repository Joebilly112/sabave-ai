import { CANCELS, COMPLAINTS, PLATFORMS, type CancelId, type CekInput, type ComplaintId, type PlatformId } from "@/lib/types";

function isPlatform(value: string): value is PlatformId {
  return (PLATFORMS as readonly string[]).includes(value);
}

function isCancel(value: string): value is CancelId {
  return (CANCELS as readonly string[]).includes(value);
}

function isComplaint(value: string): value is ComplaintId {
  return (COMPLAINTS as readonly string[]).includes(value);
}

export function parseCek(body: unknown): CekInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const platform = typeof raw.platform === "string" ? raw.platform : "";
  const cancel = typeof raw.cancel === "string" ? raw.cancel : "";
  if (!isPlatform(platform) || !isCancel(cancel)) return null;

  const rating = typeof raw.rating === "number" ? raw.rating : Number(raw.rating);
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) return null;

  const trips = typeof raw.trips === "number" ? raw.trips : Number(raw.trips);
  if (!Number.isInteger(trips) || trips < 0 || trips > 400) return null;

  if (!Array.isArray(raw.complaints)) return null;
  const complaints: ComplaintId[] = [];
  for (const item of raw.complaints) {
    if (typeof item !== "string" || !isComplaint(item) || complaints.includes(item)) return null;
    complaints.push(item);
  }

  return {
    platform,
    rating: Math.round(rating * 100) / 100,
    cancel,
    complaints,
    trips,
  };
}
