import { Activity, MoonStar, Route } from "lucide-react";
import { CekForm } from "@/components/CekForm";
import { Hero } from "@/components/Hero";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

const bands = [
  { name: "Ringan", text: "Menit dan tidur masih menyisakan akhir hari. Jaga supaya akhir pekan tidak ikut terkuras.", color: "text-sage" },
  { name: "Berat", text: "Perjalanan sudah mengambil pemulihan. Dua minggu pengaturan jadwal lebih berguna daripada menahan saja.", color: "text-amber" },
  { name: "Bahaya", text: "Pola ini sudah di zona kelelahan. Tetap bukan diagnosis — ini sinyal untuk mengatur jam, duduk, tidur, dan satu permintaan ke kantor.", color: "text-coral" },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-4 sm:grid-cols-3">
        {[
          { icon: Activity, title: "Skor beban", text: "Ringan, berat, atau bahaya dari menit, postur, ganti, tidur, dan rasa saat sampai." },
          { icon: Route, title: "Tiga beban terbesar", text: "Bukan daftar umum. Tiga hal yang paling menaikkan skor pada isianmu." },
          { icon: MoonStar, title: "Rencana 14 hari", text: "Geser jam berangkat, kejar satu penggal duduk, jaga tidur, dan satu permintaan ke kantor." },
        ].map((item) => (
          <article key={item.title} className="rounded-3xl border border-mist bg-paper/80 p-5">
            <item.icon className="h-5 w-5 text-indigo" />
            <h2 className="mt-3 font-semibold text-night">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-mute">{item.text}</p>
          </article>
        ))}
      </section>
      <CekForm />
      <section className="mx-auto max-w-6xl px-5 py-8">
        <h2 className="text-2xl font-semibold tracking-tight text-night">Tiga pita, satu perjalanan</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {bands.map((band) => (
            <article key={band.name} className="rounded-3xl bg-night p-5 text-bone">
              <h3 className={`text-lg font-semibold ${band.color}`}>{band.name}</h3>
              <p className="mt-3 text-sm leading-6 text-bone/80">{band.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-8">
        <h2 className="text-2xl font-semibold text-night">Yang sering ditanyakan</h2>
        <dl className="mt-4 space-y-4 text-sm leading-6">
          <div>
            <dt className="font-semibold text-night">Apakah ini diagnosis?</dt>
            <dd className="text-mute">Tidak. Nyeri yang kamu isi dicatat sebagai beban. Kalau nyeri menetap atau napas terganggu, temui tenaga kesehatan.</dd>
          </div>
          <div>
            <dt className="font-semibold text-night">Kenapa sekali bayar {formatRupiah(UNLOCK_PRICE_IDR)}?</dt>
            <dd className="text-mute">Skor, tiga beban, dan rencana 14 hari terbuka di tautan hasilmu. Tidak ada langganan.</dd>
          </div>
          <div>
            <dt className="font-semibold text-night">Apakah gaji ikut dihitung?</dt>
            <dd className="text-mute">Tidak. Alat ini tidak menanyakan penghasilan dan tidak menyarankan tawaran gaji.</dd>
          </div>
        </dl>
      </section>
    </>
  );
}
