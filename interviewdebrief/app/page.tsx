import { DebriefForm } from "@/components/DebriefForm";
import { Hero } from "@/components/Hero";
import { buildMetadata, site } from "@/lib/seo";

export const metadata = buildMetadata({
  title: site.title,
  description: site.description,
  path: "/",
});

const steps = [
  { n: "01", title: "Tulis yang masih segar", body: "Peran, format, pertanyaan yang kamu ingat, durasi, dan rasa di perut." },
  { n: "02", title: "Bayar sekali", body: "Rp19.900 lewat QRIS atau e-wallet. Tidak ada langganan dan tidak ada iklan." },
  { n: "03", title: "Baca yang lemah saja", body: "Empat skor, tiga momen, dan draf pesan 48 jam. Bukan vonis diterima atau ditolak." },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "19900", priceCurrency: "IDR" },
    description: site.description,
    url: site.url,
    inLanguage: "id",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <section id="cara" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Cara pakainya</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.n} className="ink-ring rounded-3xl bg-card p-5">
              <p className="text-xs font-semibold tracking-[0.16em] text-amber">{step.n}</p>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{step.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="mulai" className="mx-auto grid max-w-6xl gap-8 px-5 pb-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Catat sebelum spiral menulis ulang semuanya.</h2>
          <p className="mt-4 text-sm leading-relaxed text-mute">
            Ini untuk pencari kerja dan fresh graduate yang baru selesai wawancara. Hasilnya memisahkan rasa “saya hancur” dari bagian jawaban yang memang tipis. Bukan prediksi diterima, dan bukan perbandingan gaji.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>Skor struktur, kejelasan, contoh, pertanyaan balik</li>
            <li>Tiga momen paling lemah, dengan cara merapikannya</li>
            <li>Draf follow-up yang bisa dikirim dalam 48 jam</li>
          </ul>
        </div>
        <DebriefForm />
      </section>
    </>
  );
}
