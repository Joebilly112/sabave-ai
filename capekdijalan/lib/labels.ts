import type { Mode, Mood, Pain, Posture, Recovery, StrainBand } from "@/lib/types";

export const modeLabel: Record<Mode, string> = {
  krl: "KRL",
  motor: "Motor",
  mobil: "Mobil",
  ojol: "Ojol",
  bus: "Bus kota",
  transjakarta: "Transjakarta",
};

export const postureLabel: Record<Posture, string> = {
  berdiri: "Hampir selalu berdiri",
  duduk: "Hampir selalu duduk",
  campuran: "Campuran berdiri dan duduk",
};

export const painLabel: Record<Pain, string> = {
  tidak: "Tidak ada nyeri yang mengganggu",
  punggung: "Punggung terasa berat",
  leher: "Leher terasa berat",
  keduanya: "Punggung dan leher terasa berat",
};

export const moodLabel: Record<Mood, string> = {
  segar: "Masih segar saat sampai",
  datar: "Datar saat sampai",
  habis: "Sudah habis saat sampai",
  marah: "Mudah tersulut saat sampai",
};

export const recoveryLabel: Record<Recovery, string> = {
  pulih: "Akhir pekan biasanya memulihkan",
  setengah: "Akhir pekan hanya memulihkan sebagian",
  tetaplelah: "Senin masih terasa lelah",
};

export const bandLabel: Record<StrainBand, string> = {
  ringan: "Ringan",
  berat: "Berat",
  bahaya: "Bahaya",
};
