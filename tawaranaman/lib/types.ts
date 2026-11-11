export const SOURCES = ["p3mi", "lpk", "perorangan", "iklan"] as const;
export const VISAS = ["kerja", "wisata", "umrah", "tidak-tahu"] as const;
export const FEE_WHEN = ["tidak-diminta", "sebelum-berangkat", "dipotong-gaji"] as const;
export const DOCUMENTS = ["tidak-ada", "paspor", "ijazah-asli"] as const;
export const YES_NO_UNSURE = ["ya", "tidak", "tidak-tahu"] as const;
export const YES_NO = ["ya", "tidak"] as const;
export const BANDS = ["aman", "waspada", "bahaya"] as const;

export type SourceId = (typeof SOURCES)[number];
export type VisaId = (typeof VISAS)[number];
export type FeeWhenId = (typeof FEE_WHEN)[number];
export type DocumentId = (typeof DOCUMENTS)[number];
export type YesNoUnsure = (typeof YES_NO_UNSURE)[number];
export type YesNo = (typeof YES_NO)[number];
export type BandId = (typeof BANDS)[number];

export type OfferInput = {
  source: SourceId;
  country: string;
  visa: VisaId;
  feeIdr: number;
  feeWhen: FeeWhenId;
  loan: YesNo;
  documents: DocumentId[];
  siskoOwn: YesNoUnsure;
  contractShown: YesNo;
};

export type FlagItem = {
  title: string;
  detail: string;
};

export type CheckItem = {
  title: string;
  detail: string;
  href?: string;
};

export type OfferResult = {
  band: BandId;
  bandLabel: string;
  headline: string;
  points: number;
  flags: FlagItem[];
  checks: CheckItem[];
  refusalScript: string;
  assumptions: string[];
};

export type StoredOffer = {
  id: string;
  orderId: string;
  status: "pending" | "paid";
  createdAt: string;
  paidAt: string | null;
  input: OfferInput;
  result: OfferResult;
  transactionStatus: string | null;
  snapRedirectUrl: string | null;
};
