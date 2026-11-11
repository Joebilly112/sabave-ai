import { CekForm } from "@/components/CekForm";
import { Hero } from "@/components/Hero";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

const STEPS = [
  {
    title: "Salin yang tertulis",
    body: "Platform, jenis suspend, alasan di layar, sisa hari, dan jumlah peringatan. Jangan menerjemahkan status dari cerita grup.",
  },
  {
    title: "Kunci berkas",
    body: `Sekali bayar ${formatRupiah(UNLOCK_PRICE_IDR)} lewat QRIS atau e-wallet. Tidak ada langganan.`,
  },
  {
    title: "Kerjakan 48 jam",
    body: "Bukti, satu pengajuan resmi, dan daftar yang jangan dilakukan — termasuk akun kedua.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flare">Satu emosi</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-night">Panik saat aplikasi mengunci penghasilan hari ini.</h2>
            <p className="mt-4 text-sm leading-7 text-mist">
              AkunSuspend hanya menjawab pertanyaan itu: langkah banding apa yang dikerjakan dulu. Bukan perbandingan
              tarif, bukan hitung bonus, dan bukan cara menyalakan akun lewat jalan pintas.
            </p>
            <dl className="mt-8 space-y-4">
              {STEPS.map((step, index) => (
                <div key={step.title} className="rounded-3xl border border-line bg-paper p-4">
                  <dt className="text-sm font-semibold">
                    0{index + 1} · {step.title}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-mist">{step.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <CekForm />
        </div>
      </section>
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-12 text-sm leading-7 text-mist">
          Informasi saja. Gojek, Grab, dan platform lain yang memutuskan akun nyala, tetap suspend, atau putus mitra.
          AkunSuspend tidak terhubung ke data internal mereka.
        </div>
      </section>
    </>
  );
}
