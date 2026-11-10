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
        Situs ini tidak memasang cookie pelacak iklan. Pembayaran Midtrans dapat memakai cookie pada halaman
        mereka setelah kamu meninggalkan ShiftRusak.
      </p>
      <p>
        Hasil dinas dikenali lewat tautan /hasil, bukan lewat akun. Siapa pun yang memegang tautan itu dapat
        membuka halaman yang sama.
      </p>
    </LegalPage>
  );
}
