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
        ClientGhost bukan kantor hukum, bukan penagih utang, dan bukan layanan perbandingan penghasilan. Checklist dan
        pesan yang dihasilkan adalah kehati-hatian kerja sehari-hari.
      </p>
      <p>
        Skor tidak memprediksi perilaku seseorang secara pasti. Dua brief yang mirip bisa tetap berakhir berbeda. Untuk
        sengketa kontrak atau jumlah yang sudah jatuh tempo, bicara dengan penasihat hukum yang kamu percaya.
      </p>
      <p>Contoh chat di beranda adalah ilustrasi, bukan cuplikan klien sungguhan.</p>
    </LegalPage>
  );
}
