"use client";

import { motion } from "framer-motion";
import { CalendarRange, FileWarning, Stamp } from "lucide-react";

const rows = [
  { label: "Ijazah terakhir", ok: true },
  { label: "NUPTK aktif", ok: true },
  { label: "SK atau surat tugas", ok: true },
  { label: "Surat izin kepala sekolah", ok: false },
  { label: "Bukti linieritas mapel", ok: false },
];

const days = ["Berkas", "Izin", "Uji", "Portal"];

export function HeroLembar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative"
    >
      <div className="absolute -left-3 top-8 hidden h-16 w-8 rounded-l-xl bg-seal/90 md:block" />
      <div className="relative overflow-hidden rounded-[28px] border border-line bg-card shadow-folder">
        <div className="flex items-center justify-between border-b border-dashed border-line px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Contoh tampilan</p>
            <p className="mt-1 font-bold text-ink">Lembar kesiapan seleksi</p>
          </div>
          <Stamp className="h-5 w-5 text-stamp" aria-hidden />
        </div>
        <div className="grid gap-6 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-6">
          <div>
            <p className="text-sm text-mist">Guru honorer · 6 tahun · S1 kependidikan · belum pernah daftar</p>
            <div className="mt-4 flex items-end gap-3">
              <p className="text-6xl font-extrabold tracking-tight text-ink">64</p>
              <p className="mb-2 text-sm font-semibold text-mist">/ 100 · Hampir</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink">
              Dua berkas kunci masih bolong. Slot tahun ini masih mungkin, asal izin dan linieritas tidak dikejar di minggu terakhir.
            </p>
            <ul className="mt-5 space-y-2">
              {rows.map((row) => (
                <li key={row.label} className="flex items-center justify-between rounded-2xl border border-line bg-white px-3 py-2 text-sm">
                  <span className="text-ink">{row.label}</span>
                  <span className={row.ok ? "font-semibold text-seal" : "inline-flex items-center gap-1 font-semibold text-stamp"}>
                    {row.ok ? "Ada" : "Kosong"}
                    {!row.ok ? <FileWarning className="h-3.5 w-3.5" aria-hidden /> : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-3xl bg-ink p-4 text-card">
            <div className="absolute right-4 top-4 grid h-20 w-20 rotate-[-14deg] place-items-center rounded-full border-2 border-dashed border-stamp text-[11px] font-extrabold uppercase tracking-wider text-stamp">
              Cek dulu
            </div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              <CalendarRange className="h-4 w-4" aria-hidden />
              30 hari
            </p>
            <ol className="mt-6 space-y-3">
              {days.map((day, index) => (
                <li key={day} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-bold">{index + 1}</span>
                  <span className="text-sm font-semibold">{day}</span>
                  <span className="h-px flex-1 bg-white/15" />
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs leading-relaxed text-white/65">Angka di kartu ini hanya contoh. Skor milikmu terbuka setelah isian diperiksa.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
