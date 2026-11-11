import { CekForm } from "@/components/CekForm";
import { Hero } from "@/components/Hero";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

const steps = [
  {
    title: "Isi tawarannya, bukan nama orangnya",
    body: "Sumber, negara, visa, biaya, pinjaman, dokumen, akun SISKOP2MI, dan apakah kontrak ditunjukkan.",
  },
  {
    title: "Bayar sekali",
    body: `${formatRupiah(UNLOCK_PRICE_IDR)} lewat QRIS atau dompet digital. Tidak ada langganan.`,
  },
  {
    title: "Baca pita dan langkah resmi",
    body: "Aman, waspada, atau bahaya, plus tanda yang ketahuan, cek Migran Aman dan SISKOP2MI, dan naskah tolak yang sopan.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-5 pb-6">
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-3xl border border-line bg-paper p-5">
              <p className="text-xs font-semibold text-sea">0{index + 1}</p>
              <h2 className="mt-2 text-lg font-semibold text-deep">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-mute">{step.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="cek" className="mx-auto max-w-3xl px-5 py-12">
        <h2 className="text-3xl font-semibold tracking-tight text-deep">Cek tawaran ini</h2>
        <p className="mt-3 text-sm leading-6 text-mute">
          Satu emosi: harapan yang bercampur takut. Bukan alat gaji, dan bukan surat keterangan dari pemerintah.
        </p>
        <div className="mt-6">
          <CekForm />
        </div>
      </section>
    </>
  );
}
