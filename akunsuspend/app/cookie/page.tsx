import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie",
  robots: { index: false, follow: false },
};

export default function CookiePage() {
  return (
    <LegalPage title="Cookie" updated="11 November 2026">
      <p>
        Situs ini tidak memasang cookie iklan. Kunjungan halaman dicatat lewat permintaan analitik sederhana tanpa
        profil lintas situs.
      </p>
      <p>Pembayaran Midtrans dapat memakai cookie di domain mereka saat kamu membuka halaman bayar.</p>
    </LegalPage>
  );
}
