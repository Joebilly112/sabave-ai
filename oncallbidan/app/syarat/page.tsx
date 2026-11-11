import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export const metadata: Metadata = {
  title: "Syarat",
  robots: { index: false, follow: false },
};

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat penggunaan" updated="11 November 2026">
      <p>
        Dengan mengisi buku jaga, kamu menyatakan angka itu perkiraanmu sendiri. Hasil adalah pita beban, usulan malam
        yang dilindungi, dan naskah yang bisa kamu sunting. Bukan izin istirahat, bukan penilaian kompetensi, dan bukan
        nasihat medis.
      </p>
      <p>
        Buka kunci berharga {formatRupiah(UNLOCK_PRICE_IDR)} sekali bayar. Tidak ada langganan. Pembayaran yang sudah
        berhasil membuka halaman hasil itu. Situs ini tidak menyimpan dana di luar Midtrans.
      </p>
      <p>
        Jangan memasukkan nama pasien atau cerita klinis yang bisa mengidentifikasi seseorang. Kolom yang ada hanya
        angka dan centang.
      </p>
      <p>Kamu tetap bertanggung jawab atas jadwal praktik dan atas pesan yang benar-benar kamu kirim.</p>
    </LegalPage>
  );
}
