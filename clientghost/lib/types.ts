export const FOUND = ["rekomendasi", "marketplace", "instagram", "dm-dingin", "lowongan", "lainnya"] as const;
export const REVISIONS = ["terbatas", "tanpa-batas", "tidak-dibahas", "tidak-ada"] as const;
export const PAYMENTS = ["bertahap", "di-akhir", "tidak-ada", "belum-jelas"] as const;
export const FLAGS = [
  "tengah-malam",
  "brief-berubah",
  "sampel-gratis",
  "tunda-dp",
  "kontrak-nanti",
  "bayar-exposure",
  "baru-tanpa-jejak",
] as const;

export type FoundVia = (typeof FOUND)[number];
export type Revision = (typeof REVISIONS)[number];
export type Payment = (typeof PAYMENTS)[number];
export type Flag = (typeof FLAGS)[number];

export type KasusInput = {
  foundVia: FoundVia;
  dpPercent: number;
  hasContract: boolean;
  revision: Revision;
  payment: Payment;
  flags: Flag[];
};

export type ChecklistState = "sudah" | "wajib" | "tambahkan";

export type ChecklistItem = {
  title: string;
  detail: string;
  state: ChecklistState;
};

export type RiskBand = "rendah" | "waspada" | "tinggi";

export type KasusResult = {
  score: number;
  band: RiskBand;
  headline: string;
  reasons: string[];
  checklist: ChecklistItem[];
  message: string;
};

export type PayStatus = "pending" | "paid";

export type StoredKasus = {
  id: string;
  orderId: string;
  status: PayStatus;
  createdAt: string;
  paidAt: string | null;
  input: KasusInput;
  result: KasusResult;
  transactionStatus: string | null;
  snapRedirectUrl: string | null;
};
