import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie",
  robots: { index: false, follow: false },
};

export default function CookiePage() {
  return (
    <LegalPage title="Cookie" updated="10 November 2026">
      <p>
        Situs ini tidak memasang cookie iklan. Penyedia pembayaran dapat memakai cookie saat kamu membuka halaman
        mereka untuk menyelesaikan QRIS atau dompet digital.
      </p>
      <p>
        Analitik pertama pihak mengirim jalur halaman ke server tanpa menyimpan profil iklan di peramban.
      </p>
    </LegalPage>
  );
}
