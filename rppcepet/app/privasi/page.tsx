import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kebijakan privasi",
  path: "/privasi",
  noindex: true,
});

export default function PrivasiPage() {
  return (
    <LegalPage title="Kebijakan privasi">
      <p>
        RPP Cepet menyimpan isian rencana pelajaran (jenjang, mapel, kurikulum, topik, jumlah siswa, dan menit yang
        tersisa), status pembayaran, dan peristiwa kunjungan halaman. Jangan memasukkan nama siswa atau data pribadi lain
        pada kolom topik.
      </p>
      <p>
        Data pesanan disimpan di Firestore pada proyek skoolnow-ea6ff, basis data rppcepet, lewat server. Pengunjung tidak
        diberi akses langsung ke basis data. Pembayaran diproses oleh Midtrans. Kami tidak menyimpan nomor kartu atau saldo
        e-wallet.
      </p>
      <p>
        Jika kunci DeepSeek dipasang di server, teks tujuan dapat dikirim ke layanan itu untuk dirapikan. Tanpa kunci,
        kerangka tetap dibuat di server kami.
      </p>
    </LegalPage>
  );
}
