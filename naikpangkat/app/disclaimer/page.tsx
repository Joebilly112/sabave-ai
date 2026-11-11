import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Disclaimer",
  description: "NaikPangkat adalah informasi, bukan penetapan kepegawaian.",
  path: "/disclaimer",
  noindex: true,
});

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="11 November 2026">
      <p>
        NaikPangkat memberi informasi umum agar map kenaikan pangkat lebih mudah disusun. Ini bukan keputusan BKN, BKD,
        atau instansi tempat Anda bertugas. Tidak ada hasil di situs ini yang mengubah pangkat, golongan, atau status
        PPPK.
      </p>
      <p>
        Patokan empat tahun, serta tanggal 1 April dan 1 Oktober, dipakai sebagai pengingat yang umum beredar. Aturan
        dan jadwal unggahan pada instansi Anda bisa berbeda. Angka kredit, hukuman disiplin, dan kelayakan jabatan hanya
        bisa dipastikan dari berkas resmi.
      </p>
      <p>
        Produk ini tidak menghitung gaji, tunjangan, atau kelayakan finansial. Jika Anda membutuhkan kepastian, tanyakan
        ke bagian kepegawaian dan baca edaran periode yang sedang berjalan.
      </p>
    </LegalPage>
  );
}
