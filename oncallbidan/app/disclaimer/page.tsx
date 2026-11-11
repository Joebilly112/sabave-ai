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
        OnCallBidan bukan layanan kesehatan, bukan organisasi profesi, dan bukan bagian dari rumah sakit atau klinik.
        Pita aman, waspada, dan kritis adalah skala internal dari isian 14 hari.
      </p>
      <p>
        Situs ini tidak mendiagnosis kelelahan, tidak menyarankan obat, dan tidak memutuskan apakah kamu boleh menolong
        persalinan. Jika mengantuk saat bertindak, hampir salah langkah, atau merasa tidak aman, berhenti dari jaga dan
        hubungi rekan atau faskes.
      </p>
      <p>
        Naskah ke pasien tidak boleh dipakai untuk menolak persalinan yang sudah berjalan atau keluhan yang tidak bisa
        menunggu. Sesuaikan nama dan jam sebelum mengirim.
      </p>
    </LegalPage>
  );
}
