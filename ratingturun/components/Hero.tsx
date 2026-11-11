"use client";

import { motion } from "framer-motion";
import { Lock, Star } from "lucide-react";
import { BandPill } from "@/components/ui";

const LOCKED = ["Pita risiko", "Rencana 20 order", "Naskah penumpang"];

export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-8 pt-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-road">Mitra ojek · satu pertanyaan</p>
        <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-asphalt sm:text-5xl">
          Rating saya turun. Seberapa bahaya buat prioritas order?
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-mute">
          Bintang yang merosot pelan setelah beberapa order buruk terasa seperti menunggu giliran dibatasi. Isi
          kondisi minggu ini. Sekali bayar membuka pita aman, waspada, atau kritis, plus rencana dua puluh order
          dan kalimat yang tenang untuk penumpang.
        </p>
        <p className="mt-4 text-sm text-road">Bukan kunci akun. Bukan perbandingan tarif. Bukan janji aplikasi.</p>
      </div>
      <div className="relative mx-auto w-full max-w-md">
        <motion.div
          aria-hidden
          className="absolute -left-3 top-8 text-star"
          animate={{ y: [0, 18, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star size={22} fill="currentColor" />
        </motion.div>
        <div className="rounded-[32px] border border-line bg-asphalt p-5 text-sand shadow-road">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-sand/50">
            <span>Contoh tampilan</span>
            <span>bukan akun sungguhan</span>
          </div>
          <div className="mt-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-star">Gojek · minggu ini</p>
              <p className="mt-1 text-5xl font-semibold tracking-tight">4,71</p>
            </div>
            <div className="pb-1 text-right">
              <p className="text-xs text-sand/60">dari 4,92</p>
              <p className="mt-2 text-sm font-medium text-ember">turun pelan</p>
            </div>
          </div>
          <div className="mt-4">
            <BandPill band="waspada">Waspada · contoh</BandPill>
          </div>
          <ul className="mt-5 space-y-2">
            {LOCKED.map((label) => (
              <li key={label} className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-3 text-sm">
                <span>{label}</span>
                <span className="inline-flex items-center gap-1 text-xs text-sand/50">
                  <Lock size={12} /> terkunci
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
