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
        RatingTurun bukan bagian dari Gojek, Grab, Maxim, atau inDrive. Pita aman, waspada, dan kritis tidak
        menyatakan bahwa akunmu akan dibatasi, tetap hidup, atau mendapat prioritas order.
      </p>
      <p>
        Informasi ini bukan nasihat hukum, bukan layanan darurat, dan bukan alat tarif. Keputusan menerima atau
        membatalkan order tetap di tanganmu, dengan keselamatan di jalan di atas angka bintang.
      </p>
      <p>
        Kalau aplikasi sudah menampilkan skorsing atau menolak kamu online, baca pesan resmi platform itu. Halaman
        hasil di sini tidak membuka kunci akun.
      </p>
    </LegalPage>
  );
}
