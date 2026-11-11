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
        Situs ini tidak memasang cookie iklan. Halaman hasil mengingat laporan lewat tautan, bukan lewat akun. Midtrans
        dapat memakai cookie sendiri saat kamu membuka pembayaran.
      </p>
      <p>Catatan kunjungan yang kami simpan hanya nama peristiwa dan jalur halaman, tanpa nama orang.</p>
    </LegalPage>
  );
}
