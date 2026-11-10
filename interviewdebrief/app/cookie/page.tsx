import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie · InterviewDebrief",
  robots: { index: false, follow: false },
};

export default function CookiePage() {
  return (
    <LegalPage title="Cookie" updated="10 November 2026">
      <p>
        Situs ini tidak memasang cookie iklan. Halaman dapat memakai penyimpanan teknis yang dibutuhkan Next.js dan, saat kamu membayar, cookie yang dipasang halaman Midtrans di domain mereka.
      </p>
      <p>
        Peristiwa analitik dikirim sebagai permintaan ke /api/analytics tanpa mengidentifikasi kamu di luar jalur halaman. Menolak cookie peramban tidak menutup debrief yang sudah dibayar.
      </p>
    </LegalPage>
  );
}
