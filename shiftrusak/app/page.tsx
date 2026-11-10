import { CekForm } from "@/components/CekForm";
import { Hero } from "@/components/Hero";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ward">Cek ritme dinas</h2>
            <p className="mt-1 text-sm text-mute">Satu emosi: badan yang terasa jet lag setelah flip malam ke pagi.</p>
          </div>
          <p className="text-sm font-semibold text-ward">{formatRupiah(UNLOCK_PRICE_IDR)} sekali bayar</p>
        </div>
        <CekForm />
      </section>
    </>
  );
}
