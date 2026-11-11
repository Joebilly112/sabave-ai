import type { Metadata } from "next";
import { HelpPanel } from "@/components/HelpPanel";

export const metadata: Metadata = {
  title: "Tentang",
  description: "BertahanGak membantu pekerja migran membedakan bertahan dengan rencana, minta bantuan, dan keadaan darurat.",
};

export default function TentangPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr]">
      <article>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Tentang</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-sea">Untuk yang merasa terjebak di luar negeri</h1>
        <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink">
          <p>
            BertahanGak menjawab satu pertanyaan: masih kuat bertahan sampai kontrak habis, atau sudah waktunya minta pulang atau pindah majikan lewat jalur yang lebih aman.
          </p>
          <p>
            Pita disusun dari isianmu sendiri. Tiga hasilnya: bertahan dengan rencana, cari bantuan sekarang, atau darurat. Darurat dan seluruh kontak resmi tidak pernah dikunci di balik pembayaran.
          </p>
          <p>
            Ini bukan kantor pemerintah, bukan pengacara, dan bukan tempat menampung laporan. Jika ada bahaya, hubungi polisi setempat, KBRI atau KJRI, dan kanal Migran Aman.
          </p>
          <p>Harga laporan yang bukan darurat Rp9.900, sekali bayar, lewat dompet digital atau QRIS.</p>
        </div>
      </article>
      <HelpPanel compact />
    </div>
  );
}
