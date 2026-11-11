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
        Situs ini tidak memasang cookie iklan dan tidak menjual jejak kunjungan. Halaman hasil mengenali pembayaran
        lewat server, bukan lewat cookie pelacak.
      </p>
      <p>
        Midtrans dapat memakai cookie saat kamu membuka halaman pembayaran mereka. Kebijakan itu milik Midtrans, bukan
        milik OnCallBidan.
      </p>
      <p>Analitik internal hanya mengirim nama peristiwa dan jalur, tanpa nama bidan atau pasien.</p>
    </LegalPage>
  );
}
