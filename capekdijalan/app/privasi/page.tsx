import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privasi",
  robots: { index: false, follow: false },
};

export default function PrivasiPage() {
  return (
    <LegalPage title="Kebijakan privasi" updated="11 November 2026">
      <p>Capek di Jalan menyimpan isian perjalanan, skor, dan status pembayaran supaya tautan hasil bisa dibuka lagi. Kami tidak meminta nama, nomor telepon, atau gaji.</p>
      <p>Pembayaran diproses oleh Midtrans. Data kartu atau dompet tidak disimpan di server aplikasi ini. Status transaksi yang kami simpan adalah status yang dikirim Midtrans, misalnya settlement.</p>
      <p>Jika Firebase dikonfigurasi, catatan disimpan di Firestore basis data capekdijalan pada proyek skoolnow-ea6ff. Jika tidak, catatan berada di berkas lokal server dan hanya untuk pengembangan.</p>
      <p>Kunjungan halaman dapat dicatat sebagai peristiwa analitik pihak pertama: nama peristiwa dan jalur. Tidak ada iklan dan tidak ada pelacak pihak ketiga di halaman.</p>
      <p>Kamu dapat meminta penghapusan tautan hasil dengan menghubungi pengelola situs dan menyertakan tautan tersebut.</p>
    </LegalPage>
  );
}
