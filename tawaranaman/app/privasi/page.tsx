import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privasi",
  robots: { index: false, follow: false },
};

export default function PrivasiPage() {
  return (
    <LegalPage title="Kebijakan privasi" updated="11 November 2026">
      <p>
        TawaranAman diselenggarakan oleh PT. Think Era Labs. Kami menyimpan jenis penawar, negara tujuan, visa yang
        disebut, jumlah dan waktu biaya, ada tidaknya pinjaman, dokumen yang diminta, status akun resmi, apakah kontrak
        ditunjukkan, serta pita, tanda, naskah, dan status pembayaran, supaya halaman hasil bisa dibuka lagi.
      </p>
      <p>
        Jangan menuliskan nama orang, nomor telepon, rekening, atau isi chat. Pembayaran diproses oleh Midtrans; kami
        menyimpan status transaksi, bukan data kartu atau saldo dompet.
      </p>
      <p>
        Jika layanan bahasa opsional aktif, naskah tolak dikirim untuk dirapikan. Tanpa kunci layanan itu, naskah tetap
        dibuat di server kami. Layanan itu tidak boleh menambah tuduhan atau nomor rekening.
      </p>
      <p>
        Data disimpan di Firestore bernama tawaranaman pada proyek Firebase skoolnow-ea6ff, atau di berkas lokal saat
        kunci admin belum terpasang.
      </p>
    </LegalPage>
  );
}
