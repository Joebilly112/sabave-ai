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
        Situs ini tidak memasang cookie iklan. Kunjungan halaman dapat tercatat sebagai peristiwa analitik di server,
        berisi nama peristiwa dan jalur halaman, tanpa nama atau nomor telepon.
      </p>
      <p>Pembayaran di Midtrans mengikuti kebijakan penyedia pembayaran itu. Kami tidak menyimpan isi dompet digitalmu.</p>
    </LegalPage>
  );
}
