export const SYMPTOM_IDS = [
  "kepala",
  "dada",
  "tidur",
  "marah",
  "tubuh",
  "kosong",
  "makan",
  "takut",
] as const;

export const BANDS = ["hijau", "amber", "merah"] as const;
export const DRIVERS = ["jam", "klien", "tidur", "libur", "gejala"] as const;

export type SymptomId = (typeof SYMPTOM_IDS)[number];
export type BandId = (typeof BANDS)[number];
export type DriverId = (typeof DRIVERS)[number];

export type CekInput = {
  hoursWeek: number;
  activeClients: number;
  sleepHours: number;
  daysOff: number;
  symptoms: SymptomId[];
};

export type PlanStep = {
  window: string;
  title: string;
  action: string;
};

export type CekResult = {
  band: BandId;
  bandLabel: string;
  headline: string;
  score: number;
  driver: DriverId;
  driverLabel: string;
  plan: PlanStep[];
  clientScript: string;
  scriptKind: "jeda" | "selesai";
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
