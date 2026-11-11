import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie",
  robots: { index: false, follow: false },
};

export default function CookiePage() {
  return (
    <LegalPage title="Cookie" updated="11 November 2026">
      <p>Situs ini tidak memasang cookie iklan. Pembayaran Midtrans dapat memakai cookie di halaman mereka setelah kamu meninggalkan BertahanGak.</p>
      <p>Analitik kirim satu catatan kunjungan ke server kami: nama peristiwa dan jalur halaman. Tidak ada pelacak lintas situs.</p>
    </LegalPage>
  );
}
