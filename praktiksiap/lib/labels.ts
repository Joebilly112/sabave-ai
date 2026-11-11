import type { GearState, IbiState, PlaceState, SipbState, StrbState, WasteState, WorkplaceId } from "@/lib/types";

export const workplaceLabel: Record<WorkplaceId, string> = {
  puskesmas: "Puskesmas",
  rs: "Rumah sakit",
  klinik: "Klinik",
  belum: "Belum ada tempat kerja",
};

export const strbLabel: Record<StrbState, string> = {
  aktif: "STRB masih aktif",
  proses: "STRB sedang diperpanjang",
  belum: "STRB belum ada atau tidak aktif",
};

export const sipbLabel: Record<SipbState, string> = {
  aktif_lain: "SIPB aktif di tempat lain",
  belum: "Belum punya SIPB",
  habis: "SIPB sudah habis",
};

export const placeLabel: Record<PlaceState, string> = {
  milik: "Tempat sudah milik sendiri",
  sewa: "Tempat sewa, ada alamat",
  belum: "Belum ada tempat",
};

export const gearLabel: Record<GearState, string> = {
  lengkap: "Daftar alat sudah lengkap",
  sebagian: "Alat baru sebagian",
  belum: "Daftar alat belum disusun",
};

export const wasteLabel: Record<WasteState, string> = {
  ada: "Rencana limbah medis sudah ada",
  belum: "Limbah medis belum direncanakan",
};

export const ibiLabel: Record<IbiState, string> = {
  ada: "Rekomendasi IBI sudah ada",
  proses: "Rekomendasi IBI sedang diurus",
  belum: "Rekomendasi IBI belum diminta",
};
