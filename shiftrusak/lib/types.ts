export const SHIFT_IDS = ["pagi", "siang", "malam", "libur"] as const;
export const SYMPTOM_IDS = [
  "ngantuk",
  "marah",
  "kepala",
  "jantung",
  "susah_tidur",
  "mual",
  "fokus",
  "mood",
] as const;
export const BANDS = ["jaga", "goyah", "rusak"] as const;
export const DRIVERS = ["flip", "malam", "tidur", "commute", "kafein", "gejala"] as const;

export type ShiftId = (typeof SHIFT_IDS)[number];
export type SymptomId = (typeof SYMPTOM_IDS)[number];
export type BandId = (typeof BANDS)[number];
export type DriverId = (typeof DRIVERS)[number];

export type CekInput = {
  shifts: ShiftId[];
  commuteMinutes: number;
  sleepHours: number;
  caffeine: number;
  symptoms: SymptomId[];
};

export type ScorePart = {
  id: DriverId;
  label: string;
  points: number;
};

export type RosterDay = {
  label: string;
  shift: ShiftId;
  protect: boolean;
  note: string;
};

export type ProtectedNight = {
  label: string;
  reason: string;
};

export type CekResult = {
  score: number;
  band: BandId;
  bandLabel: string;
  headline: string;
  driver: DriverId;
  driverLabel: string;
  parts: ScorePart[];
  roster: RosterDay[];
  protectedNights: ProtectedNight[];
  script: string;
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
