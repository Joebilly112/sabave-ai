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
        STRHabis memberi informasi persiapan untuk perawat yang panik soal tanggal Surat Tanda Registrasi. Ini bukan
        nasihat hukum, bukan keputusan Konsil atau Kemenkes, dan bukan penilaian apakah kamu boleh bertugas.
      </p>
      <p>
        Ambang kredit di dalam rencana adalah isyarat penjadwalan, bukan syarat resmi. Daftar dokumen dapat berbeda
        dari halaman portal pada hari pengajuan.
      </p>
      <p>
        Jika tempat kerja atau regulator memerintahkanmu berhenti praktik, ikuti perintah itu. Jangan memakai halaman
        hasil sebagai pengganti perintah tersebut.
      </p>
    </LegalPage>
  );
}
