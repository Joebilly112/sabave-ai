"use client";

import { motion } from "framer-motion";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { CekForm } from "@/components/CekForm";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

const sampleRows = [
  { name: "Bertahan dengan rencana", note: "Gaji tepat, paspor sendiri, ada libur", open: false },
  { name: "Cari bantuan sekarang", note: "Libur hilang atau gaji sering telat", open: false },
  { name: "Darurat", note: "Tidak dikunci. Kontak resmi langsung terbuka", open: true },
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-start gap-10 px-5 pb-8 pt-12 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tide">Untuk pekerja migran</p>
        <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-sea sm:text-5xl">
          Saya masih kuat bertahan sampai kontrak habis, atau sudah waktunya minta bantuan?
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-ink/90">
          Isian singkat membaca gaji, paspor, libur, rasa aman, dan utang agensi. Hasilnya satu pita: bertahan dengan rencana, cari bantuan sekarang, atau darurat. Pita darurat dan semua nomor resmi tidak dikunci.
        </p>
        <p className="mt-4 text-sm text-mute">
          Laporan lengkap untuk pita yang bukan darurat {formatRupiah(UNLOCK_PRICE_IDR)}, sekali bayar. Bukan nasihat hukum.
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-[28px] border border-line bg-white p-4 shadow-card"
      >
        <div className="rounded-[22px] bg-sea px-4 py-4 text-sand">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-sand/70">
            <span>Contoh tampilan</span>
            <span>bukan hasilmu</span>
          </div>
          <p className="mt-3 text-lg font-semibold">Pita situasi</p>
          <p className="mt-1 text-sm text-sand/80">Negara tujuan · sektor · sisa kontrak</p>
        </div>
        <ul className="mt-3 space-y-2">
          {sampleRows.map((row) => (
            <li key={row.name} className="flex items-start justify-between gap-3 rounded-2xl bg-sand px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-sea">{row.name}</p>
                <p className="mt-1 text-xs leading-5 text-mute">{row.note}</p>
              </div>
              {row.open ? (
                <ShieldCheck className="h-4 w-4 text-leaf" aria-hidden />
              ) : (
                <LockKeyhole className="h-4 w-4 text-mute" aria-hidden />
              )}
            </li>
          ))}
        </ul>
      </motion.div>
      <div className="lg:col-span-2">
        <CekForm />
      </div>
    </section>
  );
}
