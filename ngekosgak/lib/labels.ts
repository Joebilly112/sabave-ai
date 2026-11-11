import type { Choice, Mode, Perk } from "@/lib/types";

export const modeLabel: Record<Mode, string> = {
  krl: "KRL",
  motor: "Motor",
  mobil: "Mobil",
  ojol: "Ojol",
  bus: "Bus",
};

export const perkLabel: Record<Perk, string> = {
  makan: "Makan di rumah",
  cucian: "Cucian di rumah",
  keluarga: "Ada tugas keluarga di rumah",
};

export const choiceLabel: Record<Choice, string> = {
  pulang: "Tetap pulang-pergi",
  hibrid: "Kos hari kerja, rumah akhir pekan",
  ngekos: "Ngekos dekat kantor",
};
