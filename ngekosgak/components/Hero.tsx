"use client";

import { motion } from "framer-motion";
import { Home, Moon, Train } from "lucide-react";

const rows = [
  { label: "Ongkos / bulan", pulang: "Rp693 ribu", kos: "sewa + makan" },
  { label: "Jam di jalan / tahun", pulang: "823 jam", kos: "jalan pendek" },
  { label: "Tidur pagi", pulang: "tetap jam 4", kos: "bergeser siang" },
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-6 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">Komuter yang capek di jalan</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-soot sm:text-5xl sm:leading-[1.05]">
          Ngekos dekat kantor, atau tetap pulang ke rumah?
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-ink/90">
          Bangun jam empat, dua jam di KRL, tapi takut sewa kos memakan gaji dan menjauhkan kamu dari keluarga. Isi
          perjalananmu. Putusan membandingkan uang sebulan, jam setahun, dan tidur yang kembali.
        </p>
        <p className="mt-4 text-sm text-mute">Sekali bayar Rp14.900. Bukan pembanding gaji. Bukan saran pindah.</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative"
      >
        <div className="absolute -left-3 top-8 hidden h-24 w-3 rounded-l-full bg-mist sm:block" aria-hidden />
        <div className="rounded-3xl border border-mist bg-ticket p-5 shadow-stub">
          <div className="flex items-center justify-between gap-3 border-b border-dashed border-mist pb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mute">Contoh tiket · bukan hasilmu</p>
              <p className="mt-1 font-semibold text-soot">Bogor → Sudirman · KRL · 95 menit</p>
            </div>
            <Train className="text-rail" aria-hidden />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-rail">
                <Home size={16} aria-hidden /> Pulang-pergi
              </div>
              <p className="mt-2 text-xs leading-5 text-mute">5 hari · Rp32.000/hari · tetap di rumah</p>
            </div>
            <div className="rounded-2xl bg-soot p-4 text-ticket">
              <div className="flex items-center gap-2 text-sm font-semibold text-dawn">
                <Moon size={16} aria-hidden /> Ngekos
              </div>
              <p className="mt-2 text-xs leading-5 text-ticket/80">Anggaran contoh Rp2 juta · makan di luar</p>
            </div>
          </div>
          <dl className="mt-4 space-y-2">
            {rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1.2fr_0.9fr_0.9fr] gap-2 text-sm">
                <dt className="text-mute">{row.label}</dt>
                <dd className="font-medium text-ink">{row.pulang}</dd>
                <dd className="font-medium text-moss">{row.kos}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-xl bg-dawn/20 px-3 py-2 text-sm font-medium text-soot">
            Contoh putusan: hibrid — kos Senin sampai Jumat, rumah di akhir pekan.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
