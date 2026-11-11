export const JENJANG = ["SD", "SMP", "SMA", "SMK"] as const;
export const KURIKULUM = ["Merdeka", "Lainnya"] as const;

export type Jenjang = (typeof JENJANG)[number];
export type Kurikulum = (typeof KURIKULUM)[number];

export type Intake = {
  jenjang: Jenjang;
  mapel: string;
  kurikulum: Kurikulum;
  topik: string;
  jumlahSiswa: number;
  menitTersedia: number;
};

export type Langkah = {
  fase: string;
  menit: number;
  isi: string;
};

export type Asesmen = {
  nama: string;
  cara: string;
};

export type ChecklistItem = {
  menit: number;
  tugas: string;
};

export type Outline = {
  identitas: string;
  durasiKelas: string;
  tujuan: string[];
  langkah: Langkah[];
  asesmen: Asesmen[];
  checklist: ChecklistItem[];
  redFlags: string[];
  catatan: string;
};

export type OrderStatus = "pending" | "paid" | "expire" | "cancel" | "deny";

export type StoredOrder = {
  id: string;
  status: OrderStatus;
  amount: number;
  input: Intake;
  result: Outline;
  createdAt: string;
  paidAt?: string;
};
