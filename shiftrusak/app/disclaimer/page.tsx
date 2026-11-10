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
        ShiftRusak bukan layanan medis, bukan pemeriksaan tidur, dan bukan pengganti dokter, perawat penanggung
        jawab, atau kebijakan kepegawaian rumah sakit. Skor hanya mengurutkan isian roster, tidur, commute, kafein,
        dan gejala yang kamu centang.
      </p>
      <p>
        Jika kamu mengantuk saat merawat pasien, dada sesak, atau tidak aman untuk melanjutkan dinas, minta bantuan
        di ruangan dan ke layanan kesehatan. Jangan menunggu hasil alat ini.
      </p>
      <p>Usulan tujuh hari bukan jadwal resmi. Rumah sakit yang menetapkan dinas.</p>
    </LegalPage>
  );
}
