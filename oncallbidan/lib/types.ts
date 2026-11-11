export const BACKUP_IDS = ["ada", "kadang", "tidak"] as const;
export const BANDS = ["aman", "waspada", "kritis"] as const;
export const SYMPTOM_IDS = [
  "mata_berat",
  "mudah_marah",
  "lupa_langkah",
  "cemas_telepon",
  "tidur_pecah",
  "nyeri_badan",
  "nafsu_hilang",
  "menangis",
] as const;

export type BackupId = (typeof BACKUP_IDS)[number];
export type BandId = (typeof BANDS)[number];
export type SymptomId = (typeof SYMPTOM_IDS)[number];

export type CekInput = {
  nightsOnCall: number;
  birthsAfterMidnight: number;
  sleepHours: number;
  backup: BackupId;
  symptoms: SymptomId[];
};

export type NightMark = {
  label: string;
  title: string;
  detail: string;
};

export type CekResult = {
  points: number;
  band: BandId;
  bandLabel: string;
  headline: string;
  protectNights: number;
  protectLabel: string;
  marks: NightMark[];
  patientScript: string;
  backupScript: string;
  note: string;
  assumptions: string[];
};

export type StoredCek = {
  id: string;
  orderId: string;
  status: "pending" | "paid";
  createdAt: string;
  paidAt: string | null;
  input: CekInput;
  result: CekResult;
  transactionStatus: string | null;
  snapRedirectUrl: string | null;
};

export const BACKUP_LABEL: Record<BackupId, string> = {
  ada: "Ada rekan yang bisa ganti jaga",
  kadang: "Cadangan ada, tapi tidak selalu siap",
  tidak: "Tidak ada bidan cadangan",
};

export const SYMPTOM_LABEL: Record<SymptomId, string> = {
  mata_berat: "Mata berat sampai siang",
  mudah_marah: "Mudah marah ke pasangan atau anak",
  lupa_langkah: "Takut lupa langkah karena mengantuk",
  cemas_telepon: "Kaget setiap telepon berbunyi",
  tidur_pecah: "Tidur pecah, tidak pulih setelah jaga",
  nyeri_badan: "Pegal atau nyeri yang tidak hilang",
  nafsu_hilang: "Nafsu makan hilang setelah malam",
  menangis: "Mudah menangis sesudah persalinan",
};
