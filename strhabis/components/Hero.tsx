"use client";

import { motion } from "framer-motion";
import { Stamp } from "lucide-react";

const rows = [
  { label: "Scan STR lama", state: "Siap difoto" },
  { label: "Surat SDM", state: "Belum minta" },
  { label: "Bukti SKP", state: "12 tercatat" },
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stamp">Perawat · STR mau habis</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-seal md:text-5xl">
          SDM tanya STR baru. Kamu masih mencari tanggal di galeri.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-mute">
          Isi tanggal terbit, tanggal habis, status SIP, tempat praktik, dan kredit SKP yang sudah kamu pegang.
          Sekali buka: hitungan hari, daftar dokumen, dan rencana minggu. Bukan keputusan boleh praktik.
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative"
      >
        <div className="absolute -left-3 top-8 hidden h-24 w-24 rounded-full border border-dashed border-wax lg:block" />
        <div className="relative overflow-hidden rounded-[32px] border border-line bg-card p-6 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mute">Contoh kartu</p>
              <p className="mt-2 font-semibold text-seal">STR · Ners · •••• 4821</p>
              <p className="mt-1 text-sm text-mute">Berlaku sampai 18 Des 2026</p>
            </div>
            <div className="grid h-16 w-16 -rotate-12 place-items-center rounded-full border-2 border-stamp text-stamp">
              <Stamp className="h-5 w-5" />
              <span className="text-[9px] font-bold">MEPET</span>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-paper p-4">
            <div className="flex items-end justify-between">
              <p className="text-xs uppercase tracking-wide text-mute">Hitungan</p>
              <p className="text-3xl font-semibold text-stamp">38 hari</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-mist">
              <div className="h-full w-[78%] rounded-full bg-stamp" />
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            {rows.map((row) => (
              <li key={row.label} className="flex items-center justify-between rounded-2xl border border-line px-3 py-2 text-sm">
                <span className="text-ink">{row.label}</span>
                <span className="text-xs font-semibold text-seal">{row.state}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-5 text-mute">Tampilan contoh. Angka aslimu muncul setelah tanggal diisi dan hasil dibuka.</p>
        </div>
      </motion.div>
    </section>
  );
}
