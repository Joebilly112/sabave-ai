import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Syarat",
  robots: { index: false, follow: false },
};

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat penggunaan" updated="11 November 2026">
      <p>
        Dengan mengisi formulir, kamu menyatakan bahwa isian itu tentang tawaran yang kamu atau keluargamu terima, dan
        bahwa kamu tidak memasukkan data pribadi orang lain.
      </p>
      <p>
        Pembayaran Rp9.900 membuka satu laporan untuk isian tersebut. Laporan bersifat informasi. Keputusan berangkat,
        transfer, atau menolak tetap ada di tanganmu, setelah kamu memeriksa kanal resmi KP2MI.
      </p>
      <p>
        Kamu tidak boleh memakai situs ini untuk mengancam orang lain, menyebar tuduhan, atau mengumpulkan data calon
        pekerja. Kami dapat menolak layanan yang dipakai untuk itu.
      </p>
    </LegalPage>
  );
}
