import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  robots: { index: false, follow: false },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="11 November 2026">
      <p>Capek di Jalan memberi informasi kesejahteraan tentang beban perjalanan. Ini bukan diagnosis, bukan terapi, bukan saran dokter, dan bukan surat sakit.</p>
      <p>Nyeri punggung atau leher yang kamu pilih hanya menambah skor karena kamu melaporkannya. Alat ini tidak memeriksa tubuh dan tidak menyarankan obat.</p>
      <p>Jika nyeri menetap, memburuk, atau disertai sesak, pusing hebat, atau keluhan lain yang mengganggu aktivitas, hentikan mengandalkan rencana 14 hari dan temui tenaga kesehatan.</p>
      <p>Permintaan ke kantor di dalam rencana adalah contoh kalimat tentang jendela jam. Bukan nasihat hukum ketenagakerjaan dan bukan hitungan gaji.</p>
      <p>Contoh di halaman muka dihitung dari isian fiktif supaya tampilan terlihat. Itu bukan hasil perjalananmu.</p>
    </LegalPage>
  );
}
