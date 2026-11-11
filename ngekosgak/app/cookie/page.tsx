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
        Situs ini tidak memasang cookie iklan. Analitik berupa permintaan ke /api/analytics tanpa profil lintas situs.
      </p>
      <p>
        Saat kamu membuka pembayaran, Midtrans dapat menyimpan cookie di domain mereka untuk menyelesaikan QRIS atau
        dompet digital. Cookie itu mengikuti kebijakan Midtrans.
      </p>
    </LegalPage>
  );
}
