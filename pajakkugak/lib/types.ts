export const NPWP_STATUSES = ["punya", "belum", "proses"] as const;
export const WITHHELD = ["tidak", "pph23", "pph21", "keduanya", "tidak_tahu"] as const;
export const OMZET_BANDS = ["bawah_500", "500_sampai_48", "atas_48"] as const;
export const VERDICTS = ["wajib", "mungkin", "belum"] as const;

export type NpwpStatus = (typeof NPWP_STATUSES)[number];
export type Withheld = (typeof WITHHELD)[number];
export type OmzetBand = (typeof OMZET_BANDS)[number];
export type VerdictId = (typeof VERDICTS)[number];

export type CekInput = {
  annualGross: number;
  hasNpwp: NpwpStatus;
  withheld: Withheld;
  omzetBand: OmzetBand;
};

export type CekResult = {
  verdict: VerdictId;
  verdictLabel: string;
  headline: string;
  formPath: string;
  checklist: string[];
  clientNote: string;
  assumptions: string[];
  bandUsed: OmzetBand;
  bandMismatch: boolean;
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
