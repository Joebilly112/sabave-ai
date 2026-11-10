"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Lamp } from "@/components/ui";

const chips = ["Fotokopi 3 jam", "Antar amplop", "Story harian", "Tanpa review"];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-8 pt-14 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">Nilai karier magang</p>
        <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-pine sm:text-5xl">
          Semester ini habis untuk fotokopi, atau ada keterampilan yang tersisa?
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-ink/80">
          Tuliskan jenis kantor, peran, status bayar, durasi, tugas harian, dan apakah ada pembimbing. Sekali bayar
          membuka lampu merah, kuning, atau hijau — plus empat hal yang harus kamu minta di minggu pertama dan skrip
          renegosiasi yang sopan.
        </p>
        <p className="mt-4 text-sm text-mute">Ini membaca nilai waktu dan bukti kerja, bukan pembanding gaji.</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-2xl border border-line bg-cream p-5 shadow-desk"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-pine">Contoh lampu</p>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-mute">terkunci</span>
        </div>
        <div className="mt-5 flex items-center gap-4 rounded-xl bg-sand px-4 py-4">
          <Lamp tone="merah" label="Merah" />
          <Lamp tone="kuning" lit label="Kuning" />
          <Lamp tone="hijau" label="Hijau" />
        </div>
        <p className="mt-4 text-sm leading-6 text-ink/80">
          Peran asisten riset, 12 minggu, pembimbing jarang muncul. Tugas harian masih condong ke operasional.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li key={chip} className="rounded-md border border-line bg-white px-2.5 py-1 text-xs font-medium text-pine">
              {chip}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-pine px-3 py-3 text-sm text-cream">
          <Lock className="h-4 w-4 text-amber" aria-hidden />
          Skrip ke pembimbing terbuka setelah unlock
        </div>
      </motion.div>
    </section>
  );
}
