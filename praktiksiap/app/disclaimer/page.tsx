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
        PraktikSiap memberi informasi persiapan. Keputusan izin praktik bidan ada pada dinas kesehatan dan peraturan
        yang sedang berlaku, termasuk ketentuan yang diatur menteri kesehatan. Daftar di hasil adalah tema yang sering
        muncul saat menyiapkan praktik mandiri, bukan lampiran resmi dan bukan jaminan permohonan diterima.
      </p>
      <p>
        Alat ini bukan nasihat hukum, bukan pemeriksaan sarana, dan bukan layanan klinis. Untuk syarat terbaru, tanya
        langsung ke dinas kabupaten atau kota tempat praktik akan berdiri dan ke organisasi profesi setempat.
      </p>
      <p>
        Jangan memakai hasil ini untuk menentukan tarif layanan atau membandingkan penghasilan. Produk ini tidak
        membahas gaji.
      </p>
    </LegalPage>
  );
}
