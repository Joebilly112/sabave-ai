import { CekForm } from "@/components/CekForm";
import { Hero } from "@/components/Hero";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="cek" className="mx-auto max-w-5xl px-5 py-12">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-night">Catat tanggal di kartu</h2>
            <p className="mt-1 max-w-xl text-sm leading-6 text-mute">
              Satu perasaan: dinas, HRD, atau pasien minta berkas, dan tanggal SIPB serta STRB masih samar di kepala.
            </p>
          </div>
          <p className="text-sm font-semibold text-night">{formatRupiah(UNLOCK_PRICE_IDR)} sekali bayar</p>
        </div>
        <CekForm />
      </section>
    </>
  );
}
