"use client";

import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { BandPill, Panel } from "@/components/ui";

const rows = [
  ["Sumber", "Iklan TikTok"],
  ["Tujuan", "Malaysia"],
  ["Visa dijanjikan", "Wisata"],
  ["Biaya", "Rp18.000.000 di muka"],
  ["Dokumen", "Ijazah asli"],
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Untuk keluarga calon PMI</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-deep sm:text-5xl">
          Tawaran kerja ke luar negeri ini aman, atau jebakan calo?
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-mute">
          Harapan dapat kerja sering datang bersamaan dengan takut. Isi siapa yang menawar, negara, visa, biaya,
          pinjaman, dokumen, akun resmi, dan kontrak. Sekali bayar Rp9.900 untuk pita aman, waspada, atau bahaya.
        </p>
        <p className="mt-4 max-w-xl text-sm leading-6 text-ink/80">
          Laporannya informasi. Status penyalur yang sah tetap ada di KP2MI, lewat Migran Aman dan SISKOP2MI.
        </p>
      </div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <Panel className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line bg-deep px-5 py-4 text-sand">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-sand/70">Contoh laporan</p>
              <p className="text-sm font-semibold">Bukan data sungguhan</p>
            </div>
            <ShieldAlert className="h-5 w-5 text-sand" aria-hidden />
          </div>
          <div className="space-y-3 px-5 py-5">
            <div className="flex items-center justify-between">
              <BandPill band="bahaya">Bahaya</BandPill>
              <span className="text-xs text-mute">Tahan dulu</span>
            </div>
            <dl className="space-y-2 text-sm">
              {rows.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 border-b border-line/70 pb-2">
                  <dt className="text-mute">{label}</dt>
                  <dd className="font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <ul className="flex flex-wrap gap-2 pt-1">
              <li className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-coral">Visa bukan kerja</li>
              <li className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-coral">Uang di muka</li>
              <li className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-coral">Ijazah ditahan</li>
            </ul>
            <div className="rounded-2xl bg-sand px-4 py-3">
              <p className="text-xs font-semibold text-mute">Naskah tolak</p>
              <p className="mt-1 select-none text-sm text-ink/40 blur-[2px]">
                Terima kasih. Saya tidak lanjut, tidak transfer, dan tidak menitipkan ijazah.
              </p>
            </div>
          </div>
        </Panel>
      </motion.div>
    </section>
  );
}
