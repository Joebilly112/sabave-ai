"use client";

import { motion } from "framer-motion";
import { LockKeyhole } from "lucide-react";
import { Pill } from "@/components/ui";

const bars = [
  { label: "Struktur", score: 72 },
  { label: "Kejelasan", score: 61 },
  { label: "Contoh", score: 44 },
  { label: "Pertanyaan balik", score: 38 },
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-8 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
      <div>
        <Pill>Setelah interview</Pill>
        <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Tadi hancur, atau cuma terasa hancur?
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-mute">
          Debrief sekali bayar untuk spiral setelah wawancara. Skor struktur, kejelasan, contoh, dan pertanyaan balik — lalu tiga momen yang benar-benar lemah, plus draf follow-up 48 jam.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <a href="#mulai" className="rounded-full bg-ink px-5 py-3 font-semibold text-paper hover:bg-moss">
            Susun debrief · Rp19.900
          </a>
          <a href="#cara" className="rounded-full px-5 py-3 font-semibold text-ink hover:bg-white/70">
            Lihat isinya
          </a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative"
      >
        <div className="absolute -left-6 top-8 hidden h-40 w-40 rounded-full bg-amber/20 blur-2xl lg:block" />
        <div className="ink-ring relative rounded-[28px] bg-card p-5 shadow-card sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">Contoh · faux UI</p>
            <span className="text-xs text-mute">belum dibayar</span>
          </div>
          <p className="mt-4 text-lg font-semibold">Product Analyst</p>
          <p className="text-sm text-mute">HR · 28 menit · rasa: kacau</p>
          <div className="mt-5 space-y-3">
            {bars.map((bar) => (
              <div key={bar.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{bar.label}</span>
                  <span className="tabular-nums text-mute">{bar.score}</span>
                </div>
                <div className="h-1.5 rounded-full bg-line">
                  <motion.div
                    className="h-full rounded-full bg-ink"
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.score}%` }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <ol className="mt-5 space-y-2 text-sm">
            <li>1. Konflik tanpa hasil yang kelihatan</li>
            <li>2. Alasan pindah terdengar seperti keluhan</li>
            <li>3. Tidak ada pertanyaan balik</li>
          </ol>
          <div className="relative mt-5 overflow-hidden rounded-2xl bg-paper px-4 py-3 text-sm text-mute">
            <p className="select-none blur-[3px]">
              Halo tim rekrutmen, terima kasih untuk sesi Product Analyst tadi. Saya ingin merapikan contoh konflik yang belum saya beri angkanya.
            </p>
            <div className="absolute inset-0 grid place-items-center">
              <span className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-paper">
                <LockKeyhole className="h-3.5 w-3.5" />
                Follow-up 48 jam
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
