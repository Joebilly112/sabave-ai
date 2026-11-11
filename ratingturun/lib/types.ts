export const PLATFORMS = ["gojek", "grab", "maxim", "indrive", "lain"] as const;
export const CANCELS = ["tidak", "sedikit", "sering"] as const;
export const COMPLAINTS = ["kasar", "rute", "helm", "telat"] as const;
export const BANDS = ["aman", "waspada", "kritis"] as const;
export const DRIVERS = ["rating", "batal", "keluhan", "volume"] as const;

export type PlatformId = (typeof PLATFORMS)[number];
export type CancelId = (typeof CANCELS)[number];
export type ComplaintId = (typeof COMPLAINTS)[number];
export type BandId = (typeof BANDS)[number];
export type DriverId = (typeof DRIVERS)[number];

export type CekInput = {
  platform: PlatformId;
  rating: number;
  cancel: CancelId;
  complaints: ComplaintId[];
  trips: number;
};

export type ScorePart = {
  id: DriverId;
  label: string;
  points: number;
};

export type PlanBlock = {
  range: string;
  title: string;
  detail: string;
};

export type ScriptCard = {
  situation: string;
  text: string;
};

export type CekResult = {
  score: number;
  band: BandId;
  bandLabel: string;
  headline: string;
  driver: DriverId;
  driverLabel: string;
  parts: ScorePart[];
  plan: PlanBlock[];
  scripts: ScriptCard[];
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
