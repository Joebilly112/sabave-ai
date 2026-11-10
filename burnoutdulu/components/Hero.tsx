"use client";

import { motion } from "framer-motion";
import { Lock, MoonStar } from "lucide-react";
import { BandPill } from "@/components/ui";

const stats = [
  { label: "Jam / minggu", value: "58" },
  { label: "Klien aktif", value: "5" },
  { label: "Tidur", value: "5,5 jam" },
  { label: "Hari libur", value: "1" },
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Untuk freelancer yang weekend-nya hilang</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-dusk sm:text-5xl">
          Aku freelancer-in diri sendiri sampai burnout?
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-mute">
          Kamu mengiyakan setiap revisi, tetap buka laptop di hari libur, lalu merasa kosong saat uangnya masuk.
          BurnoutDulu membaca jam, jumlah klien, tidur, hari kosong, dan sinyal tubuh — lalu mengunci pita hijau, amber,
          atau merah sampai kamu membukanya.
        </p>
        <p className="mt-4 max-w-xl text-sm leading-6 text-ink/80">
          Sekali bayar Rp14.900. Yang terbuka: pita risiko, rencana potong beban 14 hari, dan naskah untuk menjeda atau
          mengakhiri satu klien. Bukan diagnosis, bukan hitung tarif.
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-[28px] border border-line bg-dusk p-5 text-cream shadow-desk"
        aria-hidden
      >
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.16em] text-cream/60">Contoh pita · bukan hasilmu</p>
          <MoonStar className="h-4 w-4 text-ember" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-semibold">Minggu yang menelan libur</p>
          <BandPill band="amber">Amber</BandPill>
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/5 px-3 py-3">
              <dt className="text-[11px] uppercase tracking-wide text-cream/50">{item.label}</dt>
              <dd className="mt-1 text-lg font-semibold">{item.value}</dd>
            </div>
          ))}
        </dl>
        <div className="relative mt-4 overflow-hidden rounded-2xl bg-cream/10 px-4 py-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-ember">
            <Lock className="h-3.5 w-3.5" />
            Rencana 14 hari terkunci
          </div>
          <p className="mt-2 select-none text-sm leading-6 text-cream/40 blur-[3px]">
            Hari 1–3 tutup laptop di jam yang sama. Hari 4–7 jeda klien dengan revisi paling sering. Hari 8–11
            kembalikan tidur. Hari 12–14 tulis kapasitas minggu depan.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
