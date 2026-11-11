import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export const metadata: Metadata = {
  title: "Syarat",
  robots: { index: false, follow: false },
};

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat penggunaan" updated="11 November 2026">
      <p>Dengan memakai BertahanGak kamu memahami bahwa hasilnya adalah ringkasan dari jawabanmu, bukan keputusan hukum dan bukan perintah dari negara.</p>
      <p>Laporan yang bukan pita darurat dibuka sekali bayar sebesar {formatRupiah(UNLOCK_PRICE_IDR)}. Pita darurat dan daftar kontak resmi tetap dapat dibaca tanpa bayar.</p>
      <p>Kamu bertanggung jawab atas kebenaran isian. Jawaban yang ditutup-tutupi akan menggeser pita. Jika keadaan berubah, buat cek baru.</p>
      <p>Jangan memakai situs ini untuk menunda panggilan darurat. Jika ada bahaya yang sedang terjadi, hubungi polisi setempat dan perwakilan RI lebih dulu.</p>
    </LegalPage>
  );
}
