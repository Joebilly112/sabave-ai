import type { DocumentId, FeeWhenId, SourceId, VisaId, YesNo, YesNoUnsure } from "@/lib/types";

export const SOURCE_LABEL: Record<SourceId, string> = {
  p3mi: "Nama P3MI",
  lpk: "LPK",
  perorangan: "Orang perorangan",
  iklan: "Iklan online",
};

export const VISA_LABEL: Record<VisaId, string> = {
  kerja: "Visa kerja",
  wisata: "Visa wisata",
  umrah: "Visa umrah",
  "tidak-tahu": "Belum disebut",
};

export const FEE_WHEN_LABEL: Record<FeeWhenId, string> = {
  "tidak-diminta": "Tidak diminta biaya",
  "sebelum-berangkat": "Diminta sebelum berangkat",
  "dipotong-gaji": "Akan dipotong dari gaji",
};

export const DOC_LABEL: Record<DocumentId, string> = {
  "tidak-ada": "Tidak diminta dokumen asli",
  paspor: "Paspor diminta dititipkan",
  "ijazah-asli": "Ijazah asli diminta dititipkan",
};

export const SISKO_LABEL: Record<YesNoUnsure, string> = {
  ya: "Sudah di akun SISKOP2MI sendiri",
  tidak: "Belum / bukan akun sendiri",
  "tidak-tahu": "Tidak tahu apa itu akun sendiri",
};

export const CONTRACT_LABEL: Record<YesNo, string> = {
  ya: "Kontrak ditunjukkan",
  tidak: "Kontrak belum ditunjukkan",
};

export const LOAN_LABEL: Record<YesNo, string> = {
  ya: "Ada tawaran pinjaman",
  tidak: "Tidak ada pinjaman",
};
