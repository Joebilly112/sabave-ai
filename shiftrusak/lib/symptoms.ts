import type { ShiftId, SymptomId } from "@/lib/types";

export const symptomLabel: Record<SymptomId, string> = {
  ngantuk: "Ngantuk berat di tengah dinas",
  marah: "Mudah tersinggung ke rekan atau pasien",
  kepala: "Sakit kepala setelah ganti dinas",
  jantung: "Jantung berdebar setelah kopi malam",
  susah_tidur: "Sulit tidur setelah pulang dinas pagi",
  mual: "Mual atau perut tidak karuan",
  fokus: "Konsentrasi drop saat serah terima",
  mood: "Mood jatuh justru di hari libur",
};

export const shiftLabel: Record<ShiftId, string> = {
  pagi: "Pagi",
  siang: "Siang",
  malam: "Malam",
  libur: "Libur",
};
