import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Syarat",
  robots: { index: false, follow: false },
};

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat penggunaan" updated="10 November 2026">
      <p>
        Dengan memakai ClientGhost kamu menyetujui satu kali pembayaran Rp19.900 untuk membuka skor risiko, checklist
        kontrak minimum, dan pesan minta DP pada brief yang kamu kirim.
      </p>
      <p>
        Hasil adalah alat baca pola, bukan jaminan klien akan atau tidak akan membayar. Kamu tetap yang memutuskan untuk
        mulai, menunda, atau menolak pekerjaan.
      </p>
      <p>
        Jangan memakai situs ini untuk menagih secara mengancam atau untuk menyamar sebagai pihak lain. Kami dapat menolak
        layanan yang disalahgunakan.
      </p>
      <p>Pembayaran yang sudah berhasil membuka hasil pada tautan tersebut. Simpan tautannya.</p>
    </LegalPage>
  );
}
