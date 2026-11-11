export const SECTORS = ["prt", "caregiver", "pabrik", "perkebunan", "kapal"] as const;
export const WAGES = ["ya", "telat", "tidak"] as const;
export const DAY_OFFS = ["0", "1", "2"] as const;
export const PASSPORTS = ["ya", "tidak", "tidak_tahu"] as const;
export const ABUSES = ["tidak", "verbal", "fisik", "keduanya"] as const;
export const MOODS = ["stabil", "kurang_tidur", "sedih", "takut"] as const;
export const DEBTS = ["lunas", "masih", "besar"] as const;
export const BANDS = ["bertahan", "bantuan", "darurat"] as const;

export type Sector = (typeof SECTORS)[number];
export type Wage = (typeof WAGES)[number];
export type DayOff = (typeof DAY_OFFS)[number];
export type Passport = (typeof PASSPORTS)[number];
export type Abuse = (typeof ABUSES)[number];
export type Mood = (typeof MOODS)[number];
export type Debt = (typeof DEBTS)[number];
export type Band = (typeof BANDS)[number];

export type StayInput = {
  country: string;
  sector: Sector;
  monthsWorked: number;
  monthsLeft: number;
  wage: Wage;
  dayOff: DayOff;
  passport: Passport;
  abuse: Abuse;
  mood: Mood;
  debt: Debt;
};

export type Factor = {
  title: string;
  detail: string;
};

export type StayResult = {
  band: Band;
  helpFree: boolean;
  headline: string;
  summary: string;
  factors: Factor[];
  evidence: string[];
  plan: string[];
};

export type PayStatus = "pending" | "paid";

export type StoredCheck = {
  id: string;
  orderId: string;
  status: PayStatus;
  createdAt: string;
  paidAt: string | null;
  input: StayInput;
  result: StayResult;
  transactionStatus: string | null;
  snapRedirectUrl: string | null;
};
