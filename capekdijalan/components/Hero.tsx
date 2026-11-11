import { Clock3, ShieldAlert } from "lucide-react";
import { DayRibbon } from "@/components/DayRibbon";
import { StrainRing } from "@/components/StrainRing";
import { formatClock } from "@/lib/clock";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";
import { decideStrain } from "@/lib/verdict";

const sampleInput = {
  minutesOneWay: 75,
  mode: "krl" as const,
  depart: "05:20",
  returnAt: "19:10",
  posture: "berdiri" as const,
  transfers: 2,
  sleepHours: 5,
  pain: "punggung" as const,
  mood: "habis" as const,
  recovery: "setengah" as const,
};

export function Hero() {
  const sample = decideStrain(sampleInput);
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-8 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">Beban perjalanan, bukan diagnosis</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-night sm:text-5xl sm:leading-[1.1]">
          Perjalanan ke kantor ini pelan-pelan bikin kamu kelelahan?
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-ink/80">
          Isi menit pintu-ke-pintu, jam berangkat dan pulang, berdiri atau duduk, tidur, dan rasa saat sampai. Sekali bayar{" "}
          {formatRupiah(UNLOCK_PRICE_IDR)} membuka skor ringan, berat, atau bahaya, jam setahun di jalan, tiga beban terbesar, dan rencana 14 hari.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a href="#cek" className="rounded-full bg-night px-5 py-3 text-sm font-semibold text-bone">
            Cek beban perjalananku
          </a>
          <span className="inline-flex items-center gap-2 text-sm text-mute">
            <ShieldAlert className="h-4 w-4" />
            Bukan saran medis dan bukan alat gaji
          </span>
        </div>
      </div>
      <div className="rounded-[28px] bg-night p-3 shadow-card">
        <div className="rounded-[22px] bg-bone p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mute">Contoh tampilan</p>
              <p className="mt-1 text-sm text-ink/80">
                {sampleInput.minutesOneWay} menit {sampleInput.mode.toUpperCase()}, berdiri, dua kali ganti, tidur {sampleInput.sleepHours} jam
              </p>
            </div>
            <StrainRing score={sample.score} band={sample.band} />
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm font-medium text-night">
            <Clock3 className="h-4 w-4 text-indigo" />
            {sample.hoursYear.toLocaleString("id-ID")} jam setahun di jalan
          </div>
          <div className="mt-4">
            <DayRibbon depart={sampleInput.depart} returnAt={sampleInput.returnAt} />
            <p className="mt-2 text-xs text-mute">
              {formatClock(sampleInput.depart)} berangkat · {formatClock(sampleInput.returnAt)} sampai rumah
            </p>
          </div>
          <ol className="mt-5 space-y-2">
            {sample.drains.map((drain, index) => (
              <li key={drain.title} className="flex items-start gap-3 rounded-2xl bg-paper px-3 py-2 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-indigo text-[11px] font-semibold text-bone">
                  {index + 1}
                </span>
                <span>
                  <span className="font-semibold text-night">{drain.title}</span>
                  <span className="text-mute"> · {drain.points} poin</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-5 text-mute">
            Angka di kartu ini dihitung dari contoh isian, bukan dari perjalananmu. Rencana 14 hari terbuka setelah kamu mengisi data sendiri.
          </p>
        </div>
      </div>
    </section>
  );
}
