import type { Abuse, Band, DayOff, Debt, Mood, Passport, Sector, Wage } from "@/lib/types";

export const sectorLabel: Record<Sector, string> = {
  prt: "Pekerja rumah tangga",
  caregiver: "Pengasuh / caregiver",
  pabrik: "Pabrik",
  perkebunan: "Perkebunan",
  kapal: "Kapal",
};

export const wageLabel: Record<Wage, string> = {
  ya: "Gaji masuk tepat waktu",
  telat: "Gaji sering telat",
  tidak: "Gaji tidak dibayar",
};

export const dayOffLabel: Record<DayOff, string> = {
  "0": "Tidak ada hari libur",
  "1": "Satu hari libur seminggu",
  "2": "Dua hari libur atau lebih",
};

export const passportLabel: Record<Passport, string> = {
  ya: "Paspor dipegang sendiri",
  tidak: "Paspor dipegang orang lain",
  tidak_tahu: "Tidak tahu paspor ada di mana",
};

export const abuseLabel: Record<Abuse, string> = {
  tidak: "Tidak ada kekerasan",
  verbal: "Kekerasan verbal",
  fisik: "Kekerasan fisik",
  keduanya: "Kekerasan verbal dan fisik",
};

export const moodLabel: Record<Mood, string> = {
  stabil: "Tidur dan perasaan cukup stabil",
  kurang_tidur: "Kurang tidur",
  sedih: "Sedih terus",
  takut: "Merasa takut",
};

export const debtLabel: Record<Debt, string> = {
  lunas: "Utang agensi sudah lunas",
  masih: "Masih ada utang agensi",
  besar: "Utang agensi masih besar",
};

export const bandLabel: Record<Band, string> = {
  bertahan: "Bertahan dengan rencana",
  bantuan: "Cari bantuan sekarang",
  darurat: "Darurat",
};
