import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang",
  description: "RatingTurun membaca risiko bintang yang turun pelan untuk mitra ojek, sekali bayar.",
};

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-road">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-asphalt">Satu rasa: bintang yang merosot pelan</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          RatingTurun untuk mitra ojek yang melihat angka di aplikasi turun setelah beberapa order buruk, lalu
          bertanya apakah prioritas order ikut bergeser. Bukan untuk akun yang sudah terkunci, dan bukan untuk
          membandingkan tarif.
        </p>
        <p>
          Kamu mengisi platform, rating sekarang, pola batal atau skip seminggu terakhir, keluhan yang sering
          muncul, dan jumlah order yang selesai dalam tujuh hari. Sekali bayar Rp14.900 membuka pita risiko, rencana
          dua puluh order, dan naskah singkat untuk penumpang.
        </p>
        <p>
          Pita aman, waspada, dan kritis adalah urutan perhatian dari isianmu. Gojek, Grab, Maxim, dan inDrive tidak
          mempublikasikan ambang yang kami tiru, jadi hasil ini tidak menjanjikan akun tetap aman atau order pasti
          kembali ramai.
        </p>
        <p>
          Think Era Labs membuat alat ini sebagai produk terpisah. Tidak ada akun bersama dengan produk lain, dan
          tidak ada tautan silang di halaman ini.
        </p>
      </div>
    </article>
  );
}
