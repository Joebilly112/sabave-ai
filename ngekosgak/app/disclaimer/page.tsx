import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  robots: { index: false, follow: false },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="11 November 2026">
      <p>
        Putusan NgekosGak adalah informasi dari isian dan asumsi yang tertulis di hasil: jalan pendek Rp12.000, 25 menit,
        makan pengganti Rp40.000 per hari kantor, dan cucian Rp150.000 per bulan bila kamu menandainya.
      </p>
      <p>
        Patokan 20 persen ongkos transport adalah aturan praktis yang beredar di tulisan publik. Itu bukan anjuran PT.
        Think Era Labs dan bukan batas resmi.
      </p>
      <p>
        Laporan ini bukan saran keuangan, bukan penilaian kesehatan tidur, dan bukan rekomendasi untuk menandatangani
        sewa kamar tertentu.
      </p>
    </LegalPage>
  );
}
