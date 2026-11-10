import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privasi",
  description: "Data yang disimpan Magangworth saat kamu meminta lampu nilai magang.",
  path: "/privasi",
  noindex: true,
});

export default function PrivasiPage() {
  return (
    <LegalPage title="Kebijakan privasi" updated="10 November 2026">
      <p>
        Magangworth dioperasikan PT. Think Era Labs. Halaman ini menjelaskan data yang diproses saat kamu meminta
        penilaian di magangworth.id dan di https://magangworth.web.app.
      </p>
      <p>
        Yang kamu kirim: jenis kantor, peran, status bayar, durasi, tugas harian, dan akses pembimbing. Isian itu
        disimpan supaya halaman hasil bisa dibuka lagi setelah pembayaran. Jangan tulis nama lengkap, nomor identitas,
        atau rahasia kantor.
      </p>
      <p>
        Pembayaran diproses Midtrans. Kami menyimpan status transaksi dan nomor pesanan, bukan PIN atau detail dompet.
        Jika kunci model bahasa dipasang di server, isian dapat dikirim ke penyedia itu hanya untuk merapikan kalimat
        hasil. Tanpa kunci tersebut, pembacaan tetap berjalan di server kami.
      </p>
      <p>
        Data hasil disimpan di basis Firestore bernama magangworth pada proyek Firebase skoolnow-ea6ff, atau di berkas
        lokal server bila kredensial admin belum ada. Akses klien publik ditutup. Kami tidak menjual isianmu.
      </p>
      <p>
        Log kunjungan hanya menyimpan nama peristiwa dan jalur halaman, tanpa isi tugas. Untuk permintaan hapus satu
        hasil, simpan tautan /hasil/ tersebut sebagai bukti kepemilikan.
      </p>
    </LegalPage>
  );
}
