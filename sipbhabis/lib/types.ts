export const WORKPLACES = ["fasilitas", "mandiri"] as const;
export const SIPB_COUNTS = [1, 2] as const;
export const URGENCIES = ["lewat", "ketat", "dekat", "susun", "longgar"] as const;
export const DOC_STATES = ["siap", "cek", "susun"] as const;

export type WorkplaceId = (typeof WORKPLACES)[number];
export type SipbCount = (typeof SIPB_COUNTS)[number];
export type UrgencyId = (typeof URGENCIES)[number];
export type DocState = (typeof DOC_STATES)[number];

export type CekInput = {
  strbIssued: string;
  strbExpiry: string;
  sipbCount: SipbCount;
  workplace: WorkplaceId;
  skp: number;
};

export type DocItem = {
  id: string;
  title: string;
  state: DocState;
  note: string;
};

export type WeekBlock = {
  title: string;
  window: string;
  tasks: string[];
};

export type Reminder = {
  label: string;
  date: string;
  passed: boolean;
};

export type CekResult = {
  asOf: string;
  daysLeft: number;
  cycleDays: number;
  urgency: UrgencyId;
  urgencyLabel: string;
  headline: string;
  skpGap: number;
  skpBenchmark: number;
  docs: DocItem[];
  plan: WeekBlock[];
  reminders: Reminder[];
  pesan: string;
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
