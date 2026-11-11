"use client";

import { motion } from "framer-motion";
import { ClipboardList, LampDesk, ShieldCheck } from "lucide-react";

const rows = [
  { title: "STRB aktif", state: "Siap", dot: "bg-leaf" },
  { title: "Tempat sewa", state: "Proses", dot: "bg-[#e0a100]" },
  { title: "Limbah medis", state: "Kurang", dot: "bg-clay" },
  { title: "Rekomendasi IBI", state: "Proses", dot: "bg-[#e0a100]" },
];

export function Hero() {
  return (
    <section className="overflow-hidden bg-grove text-sand">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f0c9a0]">Bidan · praktik mandiri</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Mau buka praktik sendiri. Takut map-nya dikembalikan.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-sand/80">
            Isi lama kerja, STRB, SIPB, tempat, alat, limbah, dan rekomendasi IBI. Sekali bayar, kamu dapat lampu
            hijau kuning merah, daftar yang masih kurang, dan rencana 30 hari sebelum janji loket.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
              <LampDesk className="h-4 w-4 text-[#f0c9a0]" /> Bukan alat gaji
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
              <ShieldCheck className="h-4 w-4 text-sprout" /> Bukan keputusan dinas
            </span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-[28px] border border-white/10 bg-[#0f2c22] p-5 shadow-desk"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-sand/55">
            <span className="inline-flex items-center gap-2">
              <ClipboardList className="h-3.5 w-3.5" /> Papan contoh
            </span>
            <span>bukan hasilmu</span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-sand/55">Lampu contoh</p>
              <p className="text-3xl font-semibold text-[#f0c9a0]">Kuning</p>
              <p className="text-sm text-sand/70">Limbah belum punya alur</p>
            </div>
            <div className="flex gap-2" aria-hidden>
              <span className="h-3 w-3 rounded-full bg-leaf/50" />
              <span className="h-3 w-3 rounded-full bg-[#e0a100]" />
              <span className="h-3 w-3 rounded-full bg-clay/40" />
            </div>
          </div>
          <ul className="mt-5 space-y-2">
            {rows.map((row) => (
              <li key={row.title} className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2 text-sm">
                <span>{row.title}</span>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-sand/70">
                  <span className={`h-2 w-2 rounded-full ${row.dot}`} />
                  {row.state}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-2xl bg-white/5 px-3 py-3 text-sm leading-6 text-sand/75">
            Hari 15–21: tulis siapa mengangkut limbah, baru foto lemari alat.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
