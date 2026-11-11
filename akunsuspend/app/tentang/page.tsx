import type { Metadata } from "next";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export const metadata: Metadata = {
  title: "Tentang",
  description: "AkunSuspend menyusun langkah banding 48 jam untuk mitra yang akunnya terkunci.",
};

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flare">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night">Satu pertanyaan, satu produk.</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          AkunSuspend untuk mitra ojek yang tiba-tiba melihat akun ditangguhkan dan takut penghasilan hari ini hilang,
          lalu takut lagi akunnya diputus. Pertanyaannya sempit: langkah banding apa yang dikerjakan dulu.
        </p>
        <p>
          Kamu mengisi platform, jenis suspend, alasan yang tertulis, sisa hari banding, dan jumlah peringatan. Setelah{" "}
          {formatRupiah(UNLOCK_PRICE_IDR)} terbuka pita keparahan, daftar bukti, timeline 24–48 jam, hal yang jangan
          dilakukan, dan naskah singkat ke pusat bantuan resmi.
        </p>
        <p>
          Angka di pita disusun dari isian itu, bukan dari sistem internal Gojek, Grab, atau platform lain. Keputusan
          akun nyala atau putus mitra tetap di mereka. AkunSuspend tidak menjual cara membuka akun kedua.
        </p>
        <p>PT. Think Era Labs. Domain akunsuspend.id. URL publik https://akunsuspend.web.app.</p>
      </div>
    </article>
  );
}
