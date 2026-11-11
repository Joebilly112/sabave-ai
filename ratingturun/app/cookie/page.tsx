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
        Situs ini tidak memasang cookie iklan dan tidak menjual jejak kunjungan. Analitik mengirim satu peristiwa
        ke server: halaman dibuka, formulir dikirim, atau pembayaran lunas, beserta jalur halaman.
      </p>
      <p>
        Midtrans dapat menaruh cookie pada halaman pembayarannya sendiri saat kamu membuka QRIS. Kebijakan itu
        mengikuti Midtrans, bukan disimpan sebagai isi hasil RatingTurun.
      </p>
    </LegalPage>
  );
}
