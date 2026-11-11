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
        Situs ini tidak memasang cookie iklan. Pembayaran Midtrans dapat memakai cookie di halaman mereka setelah kamu
        meninggalkan PraktikSiap. Halaman hasil hanya menyimpan data di server sesuai kebijakan privasi, bukan di
        cookie peramban.
      </p>
      <p>Analitik mengirim satu peristiwa saat halaman dibuka. Peristiwa itu tidak menyertakan nama atau isi map.</p>
    </LegalPage>
  );
}
