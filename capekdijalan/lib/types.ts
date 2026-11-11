export const MODES = ["krl", "motor", "mobil", "ojol", "bus", "transjakarta"] as const;
export const POSTURES = ["berdiri", "duduk", "campuran"] as const;
export const PAINS = ["tidak", "punggung", "leher", "keduanya"] as const;
export const MOODS = ["segar", "datar", "habis", "marah"] as const;
export const RECOVERIES = ["pulih", "setengah", "tetaplelah"] as const;
export const BANDS = ["ringan", "berat", "bahaya"] as const;

export type Mode = (typeof MODES)[number];
export type Posture = (typeof POSTURES)[number];
export type Pain = (typeof PAINS)[number];
export type Mood = (typeof MOODS)[number];
export type Recovery = (typeof RECOVERIES)[number];
export type StrainBand = (typeof BANDS)[number];

export type StrainInput = {
  minutesOneWay: number;
  mode: Mode;
  depart: string;
  returnAt: string;
  posture: Posture;
  transfers: number;
  sleepHours: number;
  pain: Pain;
  mood: Mood;
  recovery: Recovery;
};

export type Drain = {
  title: string;
  detail: string;
  points: number;
};

export type ResetStep = {
  label: string;
  title: string;
  detail: string;
};

export type StrainResult = {
  band: StrainBand;
  score: number;
  hoursYear: number;
  headline: string;
  summary: string;
  drains: Drain[];
  plan: ResetStep[];
  assumptions: string[];
};

export type PayStatus = "pending" | "paid";

export type StoredCheck = {
  id: string;
  orderId: string;
  status: PayStatus;
  createdAt: string;
  paidAt: string | null;
  input: StrainInput;
  result: StrainResult;
  transactionStatus: string | null;
  snapRedirectUrl: string | null;
};
