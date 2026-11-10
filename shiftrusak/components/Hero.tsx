"use client";

import { motion } from "framer-motion";
import { Moon, Shield, Sun } from "lucide-react";

const sample = [
  { label: "M", tone: "bg-night" },
  { label: "M", tone: "bg-night" },
  { label: "P", tone: "bg-pulse" },
  { label: "M", tone: "bg-night" },
  { label: "P", tone: "bg-pulse" },
  { label: "L", tone: "bg-tide" },
  { label: "S", tone: "bg-lamp" },
];

export function Hero() {
  return (
    <section className="overflow-hidden bg-ward text-mist">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lamp">Perawat · ritme dinas</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Malam lalu pagi. Badan terasa jet lag.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-mist/80">
            Isi 14 hari dinas terakhir. Sekali bayar, kamu dapat skor gangguan ritme, malam yang sebaiknya
            dilindungi di roster berikutnya, dan naskah singkat untuk kepala ruangan.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
              <Moon className="h-4 w-4 text-lamp" /> Bukan alat gaji
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
              <Shield className="h-4 w-4 text-tide" /> Bukan nasihat medis
            </span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-white/10 bg-night/80 p-5 shadow-ward"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-mist/60">
            <span>Contoh roster</span>
            <span>bukan hasilmu</span>
          </div>
          <div className="mt-4 flex gap-2">
            {sample.map((cell, index) => (
              <div key={`${cell.label}-${index}`} className="flex-1">
                <div className={`flex h-14 items-center justify-center rounded-2xl text-sm font-semibold text-ward ${cell.tone}`}>
                  {cell.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="text-xs text-mist/60">Skor ritme contoh</p>
              <p className="text-4xl font-semibold text-lamp">74</p>
              <p className="text-sm text-pulse">Ritme rusak</p>
            </div>
            <div className="max-w-[12rem] rounded-2xl bg-white/5 p-3 text-sm leading-5">
              <p className="flex items-center gap-2 font-semibold text-lamp">
                <Sun className="h-4 w-4" /> Lindungi 2 malam
              </p>
              <p className="mt-1 text-mist/75">Jangan tempel pagi setelah blok malam.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
