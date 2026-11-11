import type { CancelId, ComplaintId, PlatformId } from "@/lib/types";

const PLATFORMS: Record<PlatformId, string> = {
  gojek: "Gojek",
  grab: "Grab",
  maxim: "Maxim",
  indrive: "inDrive",
  lain: "platform lain",
};

const CANCELS: Record<CancelId, string> = {
  tidak: "hampir tidak batal",
  sedikit: "batal atau skip 1–3 kali",
  sering: "batal atau skip 4 kali atau lebih",
};

const COMPLAINTS: Record<ComplaintId, string> = {
  kasar: "nada dianggap kasar",
  rute: "rute atau tujuan",
  helm: "helm",
  telat: "telat jemput",
};

export function platformLabel(id: PlatformId): string {
  return PLATFORMS[id];
}

export function cancelLabel(id: CancelId): string {
  return CANCELS[id];
}

export function complaintLabel(id: ComplaintId): string {
  return COMPLAINTS[id];
}

export function formatRating(rating: number): string {
  return rating.toFixed(2).replace(".", ",");
}
