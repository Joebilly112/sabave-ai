import { HelpPanel } from "@/components/HelpPanel";
import { Hero } from "@/components/Hero";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

const steps = [
  { title: "Isi fakta, bukan cerita panjang", body: "Negara, sektor, sisa kontrak, gaji, paspor, libur, rasa aman, dan utang agensi." },
  { title: "Baca pita yang cocok", body: "Bertahan dengan rencana, cari bantuan sekarang, atau darurat. Darurat terbuka tanpa bayar." },
  { title: "Simpan langkahnya", body: "Faktor, catatan bukti yang aman, dan rencana minggu ini. Nomor resmi tetap ada di setiap halaman." },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-sea">Satu pertanyaan, satu pita</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-mute">
            Alat ini untuk rasa terjebak: majikan yang keras, gaji yang tertahan, tidak ada libur, rindu rumah, dan takut biaya yang sudah keluar jadi sia-sia. Bukan pembanding gaji dan bukan perintah untuk pulang.
          </p>
          <ol className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-line bg-white px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">0{index + 1}</p>
                <p className="mt-1 font-semibold text-sea">{step.title}</p>
                <p className="mt-1 text-sm leading-6 text-mute">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-6 text-ink">
            Harga laporan yang dikunci {formatRupiah(UNLOCK_PRICE_IDR)}, sekali. Jika pitanya darurat, seluruh langkahnya gratis.
          </p>
        </div>
        <HelpPanel />
      </section>
    </>
  );
}
