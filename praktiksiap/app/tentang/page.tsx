import type { Metadata } from "next";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export const metadata: Metadata = {
  title: "Tentang",
  description: "PraktikSiap membantu bidan menata map sebelum janji ke dinas kesehatan.",
};

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-moss">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-grove">Untuk bidan yang mau praktik sendiri</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          PraktikSiap menjawab satu pertanyaan: siapkah saya membuka praktik mandiri, atau masih banyak yang kurang?
          Yang diukur adalah kesiapan map — lama praktik, tempat kerja sekarang, STRB, SIPB, tempat, alat, limbah
          medis, dan rekomendasi IBI — lalu disusun jadi lampu, daftar kekurangan, dan rencana 30 hari.
        </p>
        <p>
          Harganya {formatRupiah(UNLOCK_PRICE_IDR)}, sekali. Tidak ada hitungan gaji, tarif persalinan, atau perbandingan
          penghasilan. Izin tetap diputuskan dinas kesehatan sesuai aturan yang berlaku di kabupaten atau kota itu.
        </p>
        <p>
          Angka di hasil adalah bacaan atas isianmu. Ia tidak memeriksa ruangan, tidak menggantikan organisasi profesi,
          dan tidak menjanjikan SIPB terbit.
        </p>
      </div>
    </article>
  );
}
