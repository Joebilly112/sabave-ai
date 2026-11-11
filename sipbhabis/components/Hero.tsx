"use client";

import { motion } from "framer-motion";
import { CalendarClock, Stamp } from "lucide-react";

const weeks = [
  { label: "Minggu 1", text: "Foto kedua kartu" },
  { label: "Minggu 2", text: "Kredit yang kurang" },
  { label: "Minggu 3", text: "Surat tempat" },
];

export function Hero() {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stamp">Bidan · masa berlaku surat</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night sm:text-5xl">
            Ditanya berkas. Tanggal SIPB dan STRB masih samar.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-mute">
            Isi tanggal terbit dan habis STRB, jumlah SIPB, jenis tempat praktik, dan kredit yang sudah terkumpul.
            Sekali bayar, kamu dapat sisa hari, daftar berkas perpanjangan, dan rencana minggu demi minggu.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-night">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1">
              <CalendarClock className="h-4 w-4 text-tide" /> Bukan alat gaji
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1">
              <Stamp className="h-4 w-4 text-stamp" /> Bukan keputusan izin
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16, rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="rounded-[32px] border border-[#ead7c2] bg-paper p-5 shadow-card">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-mute">
              <span>Lembar contoh</span>
              <span>bukan tanggalmu</span>
            </div>
            <div className="mt-4 grid grid-cols-[1.1fr_0.9fr] gap-4">
              <div className="rounded-[24px] bg-night px-4 py-5 text-mist">
                <p className="text-xs uppercase tracking-[0.14em] text-gold">STRB contoh</p>
                <p className="mt-2 text-5xl font-semibold leading-none">47</p>
                <p className="mt-2 text-sm text-mist/80">hari lagi menurut kartu fiktif</p>
              </div>
              <div className="flex flex-col justify-between gap-3">
                <div className="rounded-2xl border border-dashed border-stamp/50 px-3 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stamp">Stempel contoh</p>
                  <p className="mt-1 text-sm font-semibold text-night">Jangan tunggu hari H</p>
                </div>
                <div className="rounded-2xl bg-mist px-3 py-3 text-sm">
                  <div className="flex justify-between text-xs text-mute">
                    <span>Kredit contoh</span>
                    <span>18 / 25</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                    <div className="h-full w-[72%] rounded-full bg-tide" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-mist px-3 py-1 text-night">SIPB fasilitas · contoh</span>
              <span className="rounded-full bg-[#ffe1e4] px-3 py-1 text-stamp">SIPB kedua belum dicek</span>
            </div>
            <ul className="mt-4 space-y-2">
              {weeks.map((week) => (
                <li key={week.label} className="flex items-center justify-between rounded-2xl bg-mist px-3 py-2 text-sm">
                  <span className="font-semibold text-plum">{week.label}</span>
                  <span className="text-mute">{week.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
