import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Disclaimer",
  path: "/disclaimer",
  noindex: true,
});

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer">
      <p>
        Kerangka di RPP Cepet adalah alat bantu menulis, bukan perangkat ajar resmi, bukan keputusan pengawas, dan bukan
        pengganti kebijakan sekolah atau dinas. Format, kop, dan tanda tangan mengikuti aturan tempatmu mengajar.
      </p>
      <p>
        Durasi jam pada kerangka memakai kelaziman jenjang dan harus kamu sesuaikan. Jumlah siswa hanya mengubah bentuk
        kegiatan, bukan penilaian terhadap sekolah atau murid.
      </p>
      <p>
        Kamu tetap bertanggung jawab atas apa yang diajarkan besok. Bacalah tujuan dan asesmen sebelum masuk kelas, lalu
        ubah kalimat yang tidak sesuai dengan kondisi muridmu.
      </p>
    </LegalPage>
  );
}
