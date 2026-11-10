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
        BurnoutDulu tidak memasang cookie iklan dan tidak mengikuti kamu ke situs lain. Halaman hasil dikenali lewat
        tautan yang kamu simpan, bukan lewat profil pelacakan.
      </p>
      <p>
        Penyedia pembayaran dapat menaruh cookie saat kamu membuka halaman Midtrans. Itu terjadi di domain mereka.
        Kunjungan halaman dicatat sebagai peristiwa sederhana di server jika basis data admin terpasang: nama peristiwa
        dan jalur, tanpa nama kamu.
      </p>
    </LegalPage>
  );
}
