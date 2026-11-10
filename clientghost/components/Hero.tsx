"use client";

import { motion } from "framer-motion";
import { Moon } from "lucide-react";
import { Stamp } from "@/components/ui";

const rows = [
  ["Sumber", "DM Instagram"],
  ["DP disebut", "0%"],
  ["Kontrak", "Belum ada"],
  ["Revisi", "Tanpa batas"],
  ["Bayar", "Lunas di akhir"],
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-8 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-10">
      <div>
        <Stamp>Untuk freelancer</Stamp>
        <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight text-night sm:text-6xl">
          Apakah klien ini akan menghilang sebelum bayar?
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-8 text-mute">
          Kecemasan setelah brief samar, tanpa DP, atau klien yang hanya hidup di chat tengah malam. Satu kali cek,
          sebelum kamu mengerjakan gratis.
        </p>
        <p className="mt-6 text-sm font-medium text-night">Rp19.900 sekali · skor hantu, checklist kontrak, pesan minta DP.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative"
        aria-hidden="true"
      >
        <div className="absolute -left-3 top-8 hidden h-24 w-24 rounded-full bg-flare/15 blur-2xl sm:block" />
        <div className="relative overflow-hidden rounded-[32px] border border-night/10 bg-night text-fog shadow-slip">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-2 text-sm text-fog/80">
              <Moon size={16} />
              Brief malam ini
            </div>
            <span className="text-xs tracking-[0.14em] text-fog/50">CONTOH</span>
          </div>
          <div className="space-y-3 px-5 py-5">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3 text-sm leading-6 text-fog/90">
              Besok jadi ya. Kontrak menyusul, DP nanti kalau sudah lihat hasil.
              <span className="mt-1 block text-[11px] text-fog/45">Klien · 00.41</span>
            </div>
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-flare px-4 py-3 text-sm leading-6 text-white">
              Boleh saya minta DP dulu sebelum mulai?
              <span className="mt-1 block text-[11px] text-white/70">Kamu · 00.43</span>
            </div>
            <div className="max-w-[70%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3 text-sm text-fog/90">
              Santai, saya tidak kabur.
              <span className="mt-1 block text-[11px] text-fog/45">Klien · 00.44</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-5">
            {rows.map(([label, value]) => (
              <div key={label} className="bg-night px-3 py-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-fog/40">{label}</p>
                <p className="mt-1 text-xs font-medium text-fog">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-end justify-between px-5 py-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-fog/45">Skor hantu</p>
              <p className="text-5xl font-semibold tracking-tight">78</p>
            </div>
            <p className="max-w-[11rem] text-right text-xs leading-5 text-fog/60">
              Angka ini contoh tampilan, bukan hasil dari brief kamu.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
