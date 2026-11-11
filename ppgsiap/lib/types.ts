export const EMPLOYMENT = [
  { id: "pns", label: "Guru PNS" },
  { id: "pppk", label: "Guru PPPK" },
  { id: "honorer", label: "Guru honorer" },
  { id: "swasta", label: "Guru sekolah swasta" },
  { id: "calon", label: "Belum mengajar / calon guru" },
] as const;

export const EDUCATION = [
  { id: "s1_kependidikan", label: "S1 kependidikan" },
  { id: "s2", label: "S2" },
  { id: "d4", label: "D4 / sarjana terapan" },
  { id: "s1_non", label: "S1 non-kependidikan" },
  { id: "lain", label: "Selain itu" },
] as const;

export const ATTEMPTS = [
  { id: 0, label: "Belum pernah daftar" },
  { id: 1, label: "Sudah sekali" },
  { id: 2, label: "Sudah dua kali atau lebih" },
] as const;

export const DOCUMENTS = [
  { id: "ijazah", label: "Ijazah terakhir", critical: true },
  { id: "transkrip", label: "Transkrip nilai", critical: false },
  { id: "ktp", label: "KTP dan pas foto terbaru", critical: true },
  { id: "nuptk", label: "NUPTK aktif", critical: true },
  { id: "sk", label: "SK pengangkatan atau surat tugas", critical: true },
  { id: "izin", label: "Surat izin kepala sekolah", critical: true },
  { id: "pakta", label: "Pakta integritas", critical: false },
  { id: "linier", label: "Bukti linieritas mapel yang diajar", critical: true },
] as const;

export type EmploymentId = (typeof EMPLOYMENT)[number]["id"];
export type EducationId = (typeof EDUCATION)[number]["id"];
export type AttemptId = (typeof ATTEMPTS)[number]["id"];
export type DocumentId = (typeof DOCUMENTS)[number]["id"];

export type Intake = {
  employment: EmploymentId;
  years: number;
  education: EducationId;
  attempts: AttemptId;
  documents: Record<DocumentId, boolean>;
};

export type BandId = "siap" | "hampir" | "belum" | "tunda";

export type WeekPlan = {
  rentang: string;
  judul: string;
  tugas: string[];
};

export type Readiness = {
  score: number;
  band: BandId;
  bandLabel: string;
  ringkas: string;
  reasons: string[];
  missing: { id: DocumentId; label: string; critical: boolean }[];
  readyDocs: string[];
  weeks: WeekPlan[];
  cautions: string[];
};

export type OrderStatus = "pending" | "paid" | "expire" | "cancel" | "deny";

export type StoredOrder = {
  id: string;
  status: OrderStatus;
  amount: number;
  input: Intake;
  result: Readiness;
  createdAt: string;
  paidAt?: string;
};
