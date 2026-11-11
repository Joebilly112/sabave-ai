import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie",
  robots: { index: false, follow: false },
};

export default function CookiePage() {
  return (
    <LegalPage title="Cookie" updated="11 November 2026">
      <p>Situs ini tidak memasang cookie iklan. Pembayaran Midtrans dapat memakai cookie di domain pembayaran mereka saat kamu membuka halaman bayar.</p>
      <p>Halaman hasil tidak memerlukan akun. Tautan itu sendiri adalah cara membuka kembali cekmu.</p>
      <p>Analitik pihak pertama mengirim jalur halaman ke server kami. Peristiwa itu tidak memakai cookie pelacak.</p>
    </LegalPage>
  );
}
