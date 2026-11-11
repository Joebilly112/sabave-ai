import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Syarat dan Ketentuan",
  description: "Syarat pemakaian NaikPangkat.",
  path: "/syarat",
  noindex: true,
});

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat dan Ketentuan" updated="11 November 2026">
      <p>
        Dengan membayar {SITE.priceLabel}, Anda membuka satu daftar berkas untuk data yang baru saja dikirim. Pembayaran
        bersifat sekali, bukan langganan. Akses hasil mengikuti status pembayaran yang dikonfirmasi Midtrans.
      </p>
      <p>
        Daftar disusun otomatis dari jawaban Anda. Anda bertanggung jawab atas kebenaran golongan, lama di pangkat, dan
        tahun SK yang diisi. Jangan memakai hasil ini sebagai pengganti edaran instansi atau keterangan kepegawaian.
      </p>
      <p>
        NaikPangkat tidak menerima titipan berkas, tidak mewakili Anda di depan BKD atau BKN, dan tidak menjamin usulan
        diterima. Layanan dapat dijeda jika penyimpanan atau pembayaran sedang gangguan.
      </p>
      <p>Pertanyaan tentang syarat ini dikirim ke {SITE.contactEmail}.</p>
    </LegalPage>
  );
}
