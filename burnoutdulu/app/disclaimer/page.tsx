import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  robots: { index: false, follow: false },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="10 November 2026">
      <p>
        Pita BurnoutDulu adalah pembacaan pola beban dari isianmu. Ia bukan diagnosis burnout klinis, bukan pemeriksaan
        kesehatan, dan bukan pengganti dokter, psikolog, atau psikiater.
      </p>
      <p>
        Skor menjumlahkan jam, jumlah klien, tidur, hari libur, dan gejala yang kamu centang sendiri. Dua orang dengan
        angka yang sama bisa berada dalam keadaan yang berbeda.
      </p>
      <p>
        Jika kamu merasa tidak aman, ingin menyakiti diri, atau tidak bisa menjalani hari, hentikan pemakaian dan hubungi
        layanan kesehatan atau orang yang kamu percaya. Into The Light Indonesia dan 119 ext 8 dapat menjadi pintu awal.
      </p>
    </LegalPage>
  );
}
