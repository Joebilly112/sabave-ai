import { CekForm } from "@/components/CekForm";
import { Hero } from "@/components/Hero";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">Untuk bidan yang baru selesai malam</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night md:text-5xl">
            Apakah jaga malam sudah menggerus tidur dan rumah?
          </h1>
          <p className="mt-4 text-base leading-7 text-mist">
            Empat belas hari on-call, persalinan lewat tengah malam, jam tidur, dan ada tidaknya rekan cadangan. Sekali
            bayar {formatRupiah(UNLOCK_PRICE_IDR)} membuka pita aman, waspada, atau kritis, malam yang dilindungi, dan
            naskah batas. Bukan nasihat medis.
          </p>
        </div>
        <Hero />
      </section>
      <section id="cek" className="mx-auto max-w-6xl px-5 pb-20">
        <CekForm />
      </section>
    </div>
  );
}
