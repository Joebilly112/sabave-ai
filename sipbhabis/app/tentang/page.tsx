import type { Metadata } from "next";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export const metadata: Metadata = {
  title: "Tentang",
  description: "SipbHabis menghitung sisa hari STRB dan menyusun berkas perpanjangan SIPB untuk bidan.",
};

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night">Untuk bidan yang tanggal suratnya masih samar</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          SipbHabis menjawab satu pertanyaan: kapan SIPB dan STRB saya habis, dan apa yang harus disiapkan supaya
          praktik tidak putus? Yang dibaca adalah tanggal terbit dan habis STRB, jumlah SIPB, jenis tempat praktik, dan
          kredit kompetensi yang sudah terkumpul.
        </p>
        <p>
          Harganya {formatRupiah(UNLOCK_PRICE_IDR)}, sekali. Tidak ada hitungan jasa, tarif persalinan, atau
          perbandingan penghasilan. Izin tetap diputuskan dinas kesehatan dan konsil sesuai aturan yang berlaku.
        </p>
        <p>
          Patokan 25 kredit hanya alat perencanaan di situs ini. Permenkes Nomor 28 Tahun 2017 sering disebut karena
          membingkai STRB dalam siklus lima tahun; aturan hari ini bisa berbeda. Daftar berkas adalah yang sering
          disiapkan, bukan lampiran resmi.
        </p>
      </div>
    </article>
  );
}
