export const UNITS = [
  { id: "igd", label: "IGD" },
  { id: "rawat-inap", label: "Rawat inap" },
  { id: "icu", label: "ICU / ICCU" },
  { id: "nicu", label: "NICU / perinatologi" },
  { id: "poli", label: "Poliklinik" },
  { id: "puskesmas", label: "Puskesmas" },
  { id: "ok", label: "Kamar operasi" },
  { id: "hd", label: "Hemodialisis" },
  { id: "komunitas", label: "Keperawatan komunitas" },
  { id: "lainnya", label: "Unit lain" },
] as const;

export const YEARS = [
  { id: "lt1", label: "Kurang dari 1 tahun" },
  { id: "y1to3", label: "1–3 tahun" },
  { id: "y3to5", label: "3–5 tahun" },
  { id: "y5to10", label: "5–10 tahun" },
  { id: "gt10", label: "> 10 tahun" },
] as const;

export const GOALS = [
  { id: "ward", label: "Tetap kuat di bangsal / rawat" },
  { id: "icu", label: "Pindah atau mantap di ICU" },
  { id: "komunitas", label: "Jalur komunitas / puskesmas" },
  { id: "luar-negeri", label: "Jalur luar negeri" },
] as const;

export const CERTS = [
  { id: "bls", label: "BLS / bantuan hidup dasar" },
  { id: "btcls", label: "BTCLS" },
  { id: "acls", label: "ACLS" },
  { id: "icu", label: "Keperawatan kritis / ICU" },
  { id: "luka", label: "Perawatan luka" },
  { id: "ppi", label: "PPI / pencegahan infeksi" },
  { id: "hd", label: "Hemodialisis" },
  { id: "nicu", label: "NICU / perinatal" },
  { id: "ok", label: "Perawat kamar operasi" },
  { id: "komunitas", label: "Keperawatan komunitas / promkes" },
  { id: "manajemen", label: "Manajemen bangsal" },
  { id: "kredensial-ln", label: "Bahasa medis + berkas luar negeri" },
] as const;

export type UnitId = (typeof UNITS)[number]["id"];
export type YearsId = (typeof YEARS)[number]["id"];
export type GoalId = (typeof GOALS)[number]["id"];
export type CertId = (typeof CERTS)[number]["id"];

export type Intake = {
  nickname: string;
  unit: UnitId;
  years: YearsId;
  held: CertId[];
  goal: GoalId;
};

export type RankedTraining = {
  id: CertId;
  rank: number;
  name: string;
  why: string;
  timeCost: string;
};

export type SkipTraining = {
  id: CertId;
  name: string;
  reason: string;
};

export type Recommendation = {
  next: RankedTraining[];
  skip: SkipTraining[];
  summary: string;
};

export type OrderStatus = "pending" | "paid" | "expire" | "cancel" | "deny";

export type StoredOrder = {
  id: string;
  status: OrderStatus;
  amount: number;
  input: Intake;
  result: Recommendation;
  createdAt: string;
  paidAt?: string;
};
