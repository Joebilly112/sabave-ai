import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Syarat · InterviewDebrief",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <LegalPage title="Syarat penggunaan" updated="10 November 2026">
      <p>
        Dengan membayar Rp19.900 kamu membuka satu debrief untuk satu catatan wawancara. Pembayaran bersifat sekali, bukan langganan. Akses hasil mengikuti tautan yang diberikan.
      </p>
      <p>
        Layanan ini tidak menjanjikan panggilan tahap berikutnya, tawaran kerja, atau perubahan keputusan rekruter. Draf follow-up adalah titik awal yang kamu sunting sendiri sebelum dikirim.
      </p>
      <p>
        Jangan memasukkan rahasia perusahaan, data kesehatan, atau data orang lain yang tidak perlu untuk debrief. Kami dapat menolak permintaan yang menyalahgunakan layanan.
      </p>
    </LegalPage>
  );
}
