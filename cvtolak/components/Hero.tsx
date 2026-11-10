"use client";

import { motion } from "framer-motion";
import { FileWarning, ScanSearch } from "lucide-react";
import { Pill } from "@/components/ui";

const missing = ["SQL", "dashboard", "metrik"];
const kept = ["Excel mingguan", "email terbaca"];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-8 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-10">
      <div>
        <Pill tone="signal">Lamaran senyap</Pill>
        <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Kenapa CV ini tidak dibalas sama sekali?
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-mute">
          Bukan karena kamu tidak berusaha. Halaman yang dikirim sering tidak menyebut peran, alat, atau satu hasil yang bisa discan.
          Tempel CV-nya. Sekali bayar membuka celahnya.
        </p>
        <dl className="mt-8 grid max-w-lg grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl border border-line bg-card px-3 py-3">
            <dt className="text-mute">Kunci</dt>
            <dd className="mt-1 font-semibold">Rp19.900</dd>
          </div>
          <div className="rounded-2xl border border-line bg-card px-3 py-3">
            <dt className="text-mute">Isian</dt>
            <dd className="mt-1 font-semibold">CV + peran</dd>
          </div>
          <div className="rounded-2xl border border-line bg-card px-3 py-3">
            <dt className="text-mute">Hasil</dt>
            <dd className="mt-1 font-semibold">1 halaman</dd>
          </div>
        </dl>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative"
      >
        <div className="absolute -left-3 top-8 z-10 -rotate-6 rounded-full border-2 border-signal px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-signal">
          0 balasan
        </div>
        <div className="overflow-hidden rounded-[28px] border border-line bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ScanSearch size={16} className="text-tide" />
              Pindaian contoh · Analis Data
            </div>
            <span className="text-xs text-mute">bukan hasilmu</span>
          </div>
          <div className="grid gap-0 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="relative border-b border-line p-5 sm:border-b-0 sm:border-r">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mute">Teks CV</p>
              <p className="mt-3 text-sm leading-6 text-ink/80">
                Individu yang berkomitmen, mencari kesempatan di bidang data. Membantu membuat laporan Excel mingguan.
                Pas foto terlampir.
              </p>
              <motion.div
                className="pointer-events-none absolute inset-x-4 h-px bg-tide/80"
                initial={{ top: 48 }}
                animate={{ top: [48, 150, 48] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="space-y-4 p-5">
              <div>
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-signal">
                  <FileWarning size={13} /> Hilang untuk peran ini
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {missing.map((word) => (
                    <span key={word} className="rounded-full bg-signal/10 px-2.5 py-1 text-xs font-semibold text-signal">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-tide">Simpan</p>
                <ul className="mt-2 space-y-1 text-sm text-ink/80">
                  {kept.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <p className="rounded-2xl bg-ink px-3 py-3 text-xs leading-relaxed text-paper">
                Ringkasan ditulis ulang setelah kunci: peran di kalimat pertama, satu bukti, tanpa “saya berkomitmen”.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
