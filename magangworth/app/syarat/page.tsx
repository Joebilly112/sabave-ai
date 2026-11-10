import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Syarat",
  description: "Syarat pemakaian Magangworth dan unlock sekali bayar.",
  path: "/syarat",
  noindex: true,
});

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat pemakaian" updated="10 November 2026">
      <p>
        Dengan mengirim isian, kamu meminta penilaian sekali jalan atas tugas magang yang kamu tulis sendiri. Harga
        unlock adalah Rp14.900, dibayar lewat Midtrans (QRIS atau dompet yang tersedia). Akses penuh terbuka setelah
        status transaksi settlement, atau capture yang tidak ditolak.
      </p>
      <p>
        Hasil adalah bacaan dari teks yang kamu berikan, bukan kunjungan ke kantor dan bukan janji lowongan. Kamu
        bertanggung jawab atas keputusan menerima, menolak, atau menegosiasi magang.
      </p>
      <p>
        Jangan memakai layanan ini untuk menyerahkan data orang lain tanpa izin, atau untuk menyusun keterangan palsu
        kepada kampus. Kami dapat menolak membuka hasil yang tidak lolos pemeriksaan pembayaran.
      </p>
      <p>Layanan ditujukan untuk pengguna di Indonesia dan disajikan dalam bahasa Indonesia.</p>
    </LegalPage>
  );
}
