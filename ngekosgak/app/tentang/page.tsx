import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang",
  description: "NgekosGak membantu komuter membandingkan ngekos dekat kantor dengan pulang-pergi, sekali bayar.",
};

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-soot">Satu pertanyaan: di mana kamu tidur di hari kerja?</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          NgekosGak untuk orang yang sudah lelah di jalan, tetapi belum yakin kamar kos akan membuat hidup lebih ringan.
          Yang dihitung: ongkos sebulan, jam di jalan dalam setahun, perkiraan tidur pagi yang kembali, harga sewa yang
          impas, dan pola kos hari kerja plus rumah akhir pekan.
        </p>
        <p>
          Gaji bersih hanya menjadi pembanding untuk patokan umum 20 persen ongkos transport. Produk ini tidak menilai
          apakah gaji itu layak, dan tidak membandingkan gaji dengan orang lain.
        </p>
        <p>
          Hasilnya informasi dari isianmu dan asumsi yang tertulis di laporan. Bukan saran keuangan, bukan penilaian
          kesehatan, dan bukan jaminan kamar tertentu akan terasa lebih baik.
        </p>
        <p>NgekosGak dioperasikan oleh PT. Think Era Labs. Buka laporan lengkap sekali bayar Rp14.900 lewat QRIS atau dompet digital.</p>
      </div>
    </article>
  );
}
