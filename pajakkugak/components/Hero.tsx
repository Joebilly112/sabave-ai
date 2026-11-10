"use client";

import { motion } from "framer-motion";
import { FileStack, Stamp as StampIcon } from "lucide-react";
import { Stamp } from "@/components/ui";

const rows = [
  ["Omzet klien", "Rp186.000.000"],
  ["NPWP", "Belum"],
  ["Potong PPh", "Tidak tahu"],
  ["Pita UMKM", "Di bawah Rp500 juta"],
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Musim lapor · freelancer</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-pine sm:text-5xl">
          Aku ilegal kalau belum pernah lapor pajak?
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-mute">
          Maret–April bikin omzet, NPWP, dan PPh final UMKM tercampur jadi satu rasa panik. PajakKuGak memisahkannya
          menjadi putusan wajib lapor, mungkin, atau belum tentu — plus jalur formulir dan checklist dokumen.
        </p>
        <p className="mt-4 text-sm text-ink">Sekali bayar Rp24.900. Bukan hitung gaji. Bukan nasihat pajak.</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative"
      >
        <div className="rounded-[28px] border border-line bg-paper p-5 shadow-slip">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-moss">
              <FileStack className="h-4 w-4" />
              Slip contoh
            </div>
            <Stamp tilt={-10}>Mungkin</Stamp>
          </div>
          <p className="mt-4 text-lg font-semibold text-pine">Cek dulu bukti potong, jangan langsung isi 1770 SS.</p>
          <dl className="mt-4 space-y-2 text-sm">
            {rows.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-dashed border-line py-2">
                <dt className="text-mute">{label}</dt>
                <dd className="font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 rounded-2xl bg-ledger p-3 text-sm leading-6 text-ink">
            <span className="font-semibold text-pine">Jalur baca · </span>
            1770 pekerjaan bebas. Bagian di bawah Rp500 juta umumnya bukan PPh final. SPT menyusul kalau NPWP atau bukti potong sudah ada.
          </div>
          <ul className="mt-4 space-y-2 text-sm text-mute">
            <li className="flex justify-between"><span>Rekap invoice</span><span>terkunci</span></li>
            <li className="flex justify-between"><span>Pesan minta bukti potong</span><span>terkunci</span></li>
            <li className="flex justify-between"><span>Asumsi PTKP TK/0</span><span>terkunci</span></li>
          </ul>
        </div>
        <div className="absolute -left-3 -top-3 hidden items-center gap-1 rounded-full bg-stamp px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-paper sm:flex">
          <StampIcon className="h-3.5 w-3.5" />
          Contoh tampilan
        </div>
      </motion.div>
    </section>
  );
}
