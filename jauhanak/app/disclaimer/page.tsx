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
        JauhAnak bukan layanan psikologi, konseling, atau penilaian pengasuhan. Pita dekat, renggang, atau perlu
        perhatian hanya merangkum isianmu. Tidak ada pemeriksaan anak.
      </p>
      <p>
        Jika anak menyakiti diri, tidak aman, atau kamu takut ada kekerasan, jangan menunggu laporan. Hubungi pengasuh
        yang dipercaya dan layanan darurat di tempat anak berada.
      </p>
      <p>Angka dan contoh di beranda adalah ilustrasi, bukan data keluarga sungguhan.</p>
    </LegalPage>
  );
}
