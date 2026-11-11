export const PLATFORMS = ["gojek", "grab", "lain"] as const;
export const SUSPEND_TYPES = ["sementara", "permanen", "putus"] as const;
export const BANDS = ["longgar", "sempit", "kritis"] as const;

export type PlatformId = (typeof PLATFORMS)[number];
export type SuspendType = (typeof SUSPEND_TYPES)[number];
export type BandId = (typeof BANDS)[number];

export type CekInput = {
  platform: PlatformId;
  suspendType: SuspendType;
  reason: string;
  daysLeft: number | null;
  warnings: number;
};

export type CheckItem = {
  title: string;
  detail: string;
};

export type TimelineStep = {
  window: string;
  title: string;
  action: string;
};

export type CekResult = {
  band: BandId;
  bandLabel: string;
  headline: string;
  score: number;
  channel: string;
  checklist: CheckItem[];
  timeline: TimelineStep[];
  avoid: string[];
  appealDraft: string;
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
