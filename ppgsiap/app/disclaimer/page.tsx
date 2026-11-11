import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  path: "/disclaimer",
  noindex: true,
});

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer">
      <p>PPG Siap bukan portal resmi Pendidikan Profesi Guru, bukan bimbel, dan bukan pengumuman panitia.</p>
      <p>Skor adalah perkiraan dari isianmu. Syarat berkas, kuota, dan jadwal dapat berubah pada edaran tahun berjalan.</p>
      <p>Tidak ada jaminan lolos seleksi, lulus uji, atau diterima dalam program.</p>
    </LegalPage>
  );
}
