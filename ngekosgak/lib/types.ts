export const MODES = ["krl", "motor", "mobil", "ojol", "bus"] as const;
export const PERKS = ["makan", "cucian", "keluarga"] as const;
export const CHOICES = ["pulang", "hibrid", "ngekos"] as const;

export type Mode = (typeof MODES)[number];
export type Perk = (typeof PERKS)[number];
export type Choice = (typeof CHOICES)[number];

export type CommuteInput = {
  homeArea: string;
  officeArea: string;
  mode: Mode;
  minutesOneWay: number;
  dailyCost: number;
  officeDays: number;
  takeHome: number;
  kosBudget: number;
  perks: Perk[];
};

export type MoneyLine = {
  label: string;
  amount: number;
};

export type Side = {
  choice: Choice;
  title: string;
  cash: number;
  hoursYear: number;
  sleepHoursYear: number;
  lines: MoneyLine[];
  note: string;
};

export type CommuteResult = {
  choice: Choice;
  headline: string;
  summary: string;
  sides: Side[];
  breakEvenKos: number;
  transportMonthly: number;
  twentyShare: number;
  twentyCap: number;
  overTwenty: boolean;
  twentyNote: string;
  hybridNote: string;
  checklist: string[];
  assumptions: string[];
};

export type PayStatus = "pending" | "paid";

export type StoredCheck = {
  id: string;
  orderId: string;
  status: PayStatus;
  createdAt: string;
  paidAt: string | null;
  input: CommuteInput;
  result: CommuteResult;
  transactionStatus: string | null;
  snapRedirectUrl: string | null;
};
