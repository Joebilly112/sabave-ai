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
        Situs ini tidak memasang cookie iklan dan tidak memuat pelacak pihak ketiga untuk profil minat. Halaman dapat
        mengirim peristiwa sederhana (halaman dilihat, brief dikirim) ke jalur analitik kami sendiri.
      </p>
      <p>
        Midtrans dapat memakai cookie saat kamu berada di halaman pembayaran mereka. Kebijakan itu mengikuti Midtrans,
        bukan halaman ClientGhost.
      </p>
    </LegalPage>
  );
}
