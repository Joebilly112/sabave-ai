import type { DocState, UrgencyId, WorkplaceId } from "@/lib/types";

export const workplaceLabel: Record<WorkplaceId, string> = {
  fasilitas: "Praktik di fasilitas pelayanan kesehatan",
  mandiri: "Praktik mandiri",
};

export const urgencyLabel: Record<UrgencyId, string> = {
  lewat: "Sudah lewat tanggal di kartu",
  ketat: "Kurang dari 30 hari",
  dekat: "30–90 hari lagi",
  susun: "3–6 bulan lagi",
  longgar: "Masih lebih dari 6 bulan",
};

export const docStateLabel: Record<DocState, string> = {
  siap: "Tercatat",
  cek: "Cocokkan",
  susun: "Susun dulu",
};
