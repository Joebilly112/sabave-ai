import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cookie",
  description: "Cookie dan catatan kunjungan di Magangworth.",
  path: "/cookie",
  noindex: true,
});

export default function CookiePage() {
  return (
    <LegalPage title="Cookie" updated="10 November 2026">
      <p>
        Magangworth tidak memasang cookie iklan dan tidak memuat pelacak pihak ketiga di halaman. Pembayaran Midtrans
        berjalan di situs mereka dan mengikuti kebijakan mereka setelah kamu meninggalkan halaman kami.
      </p>
      <p>
        Kunjungan dicatat sebagai peristiwa di server: nama peristiwa (halaman dibuka, isian terkirim, atau unlock
        terbaca) dan jalur halaman. Isi tugas harian tidak masuk ke catatan itu.
      </p>
      <p>Kamu bisa memakai situs ini tanpa membuat akun. Tautan hasil adalah cara membuka kembali penilaianmu.</p>
    </LegalPage>
  );
}
