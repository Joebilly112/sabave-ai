import type { Flag, FoundVia, Payment, Revision } from "@/lib/types";

export const foundLabels: Record<FoundVia, string> = {
  rekomendasi: "Rekomendasi orang yang saya kenal",
  marketplace: "Marketplace freelance",
  instagram: "Instagram atau portofolio",
  "dm-dingin": "DM dingin, tanpa jejak kerja bareng",
  lowongan: "Lowongan atau grup WhatsApp",
  lainnya: "Jalur lain",
};

export const revisionLabels: Record<Revision, string> = {
  terbatas: "Revisi dibatasi jumlah atau putarannya",
  "tanpa-batas": "Revisi tanpa batas",
  "tidak-dibahas": "Revisi belum dibahas",
  "tidak-ada": "Tidak ada revisi yang disepakati",
};

export const paymentLabels: Record<Payment, string> = {
  bertahap: "Bayar bertahap, ada uang muka",
  "di-akhir": "Lunas di akhir, setelah hasil dilihat",
  "tidak-ada": "Belum ada janji bayar yang jelas",
  "belum-jelas": "Jadwal bayar masih mengambang",
};

export const flagLabels: Record<Flag, string> = {
  "tengah-malam": "Hanya membalas tengah malam",
  "brief-berubah": "Brief berubah-ubah tanpa catatan",
  "sampel-gratis": "Minta sampel atau trial gratis",
  "tunda-dp": "DP terus ditunda",
  "kontrak-nanti": "Kontrak katanya menyusul",
  "bayar-exposure": "Imbalannya eksposur, bukan transfer",
  "baru-tanpa-jejak": "Klien baru tanpa jejak usaha",
};
