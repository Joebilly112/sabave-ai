import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tentang Magangworth",
  description: "Magangworth adalah lampu nilai karier sekali bayar untuk mahasiswa yang takut magangnya habis di pekerjaan operasional.",
  path: "/tentang",
});

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-pine">Satu rasa takut, satu lampu</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          Magangworth dibuat PT. Think Era Labs untuk mahasiswa dan fresh grad yang sedang menimbang tawaran magang.
          Pertanyaannya sempit: apakah tugas yang tertulis ini menghabiskan semester, atau meninggalkan keterampilan
          yang masih bisa ditunjukkan?
        </p>
        <p>
          Kamu mengisi jenis kantor, peran, status bayar, durasi, tugas harian, dan akses pembimbing. Server membaca
          komposisinya, lalu menyimpan lampu merah, kuning, atau hijau bersama empat permintaan minggu pertama dan
          satu skrip sopan ke pembimbing. Hasil itu terbuka setelah pembayaran satu kali.
        </p>
        <p>
          Status bayar hanya konteks waktu. Halaman ini tidak membandingkan gaji, tidak menghitung UMR, dan tidak
          menyarankan angka yang harus kamu minta. Keputusan menerima atau menolak tetap di tanganmu.
        </p>
        <p>
          Situs ini berdiri sendiri di magangworth.id dan https://magangworth.web.app. Tidak ada akun. Tautan hasil
          adalah kunci untuk membuka kembali penilaianmu.
        </p>
      </div>
    </article>
  );
}
