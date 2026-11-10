import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description: "Batas penilaian Magangworth: bukan konseling karier dan bukan saran gaji.",
  path: "/disclaimer",
  noindex: true,
});

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="10 November 2026">
      <p>
        Lampu merah, kuning, atau hijau adalah ringkasan dari isianmu. Ia bukan asesmen psikologis, bukan konseling
        karier berizin, dan bukan pendapat kampus atau perusahaan.
      </p>
      <p>
        Magangworth tidak membandingkan upah, tidak menyarankan angka gaji, dan tidak menjanjikan kamu akan diangkat
        menjadi karyawan. Status bayar hanya dipakai sebagai konteks apakah waktu yang kamu keluarkan ditukar dengan
        ekspektasi keluaran.
      </p>
      <p>
        Skrip ke pembimbing adalah draf yang perlu kamu sesuaikan dengan sapaan dan budaya kantor. Mengirimnya tetap
        keputusanmu.
      </p>
    </LegalPage>
  );
}
