import { CekForm } from "@/components/CekForm";
import { Hero } from "@/components/Hero";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

const steps = [
  {
    title: "Ceritakan iramanya, bukan nama anak",
    body: "Usia, lama terpisah, pengasuh, seberapa sering bicara, isi obrolan, tanda terakhir, dan sisa kontrak.",
  },
  {
    title: "Bayar sekali",
    body: `${formatRupiah(UNLOCK_PRICE_IDR)} lewat QRIS atau dompet. Tidak ada langganan dan tidak ada akun.`,
  },
  {
    title: "Baca pita dan rencana minggu ini",
    body: "Dekat, renggang, atau perlu perhatian, plus tiga kebiasaan, pertanyaan yang cocok untuk usianya, dan naskah untuk pengasuh.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-5 pb-6">
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-[28px] border border-line bg-paper/90 p-5">
              <p className="text-xs font-semibold text-dusk">0{index + 1}</p>
              <h2 className="mt-2 text-lg font-semibold text-night">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-mute">{step.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="cek" className="mx-auto max-w-3xl px-5 py-12">
        <h2 className="text-3xl font-semibold tracking-tight text-night">Cek jarak yang terasa</h2>
        <p className="mt-3 text-sm leading-6 text-mute">
          Satu rasa: rindu yang bercampur bersalah. Laporan ini tidak mengukur uang dan tidak menilai siapa yang lebih
          berhak dicintai anak.
        </p>
        <div className="mt-6">
          <CekForm />
        </div>
      </section>
    </>
  );
}
