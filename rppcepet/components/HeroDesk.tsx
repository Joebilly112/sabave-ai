"use client";

import { motion } from "framer-motion";
import { Lock, Moon } from "lucide-react";
import { Button, Container, Eyebrow } from "@/components/ui";
import { PRODUCT } from "@/lib/config";

const rows = [
  { label: "Tujuan", text: "Siswa menyusun tiga langkah teks prosedur dengan urutan yang bisa diikuti." },
  { label: "Inti · 50 mnt", text: "Contoh di papan, lalu tiap pasangan menulis satu prosedur dari tiga bahan." },
  { label: "Asesmen", text: "Kumpulkan paragraf. Tandai sudah atau belum, simpan dua sampel." },
  { label: "Lampu merah", text: "Jangan tulis “mengerjakan LKS” tanpa peran guru." },
];

export function HeroDesk() {
  return (
    <section className="pb-8 pt-12 sm:pt-16">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow>Untuk guru yang besok sudah di depan kelas</Eyebrow>
          <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Besok mengajar. RPP-nya masih kosong.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist">
            {PRODUCT.question} Kamu dapat kerangka tujuan, langkah, asesmen, checklist sesuai menit yang tersisa,
            dan lampu merah yang biasa ditanya pengawas.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/#mulai">Susun kerangka · {PRODUCT.priceLabel}</Button>
            <span className="inline-flex items-center gap-2 text-sm text-mist">
              <Moon className="h-4 w-4 text-lamp" />
              Sekali bayar, bukan langganan
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -left-3 -top-3 h-16 w-16 rounded-full bg-lamp/80 blur-2xl" />
          <div className="relative rounded-[28px] border border-line bg-sheet p-5 shadow-sheet sm:p-6">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-mist">
              <span>Contoh tampilan</span>
              <span>Minggu · 21.41</span>
            </div>
            <h2 className="mt-4 text-xl font-extrabold">Bahasa Indonesia · Teks prosedur</h2>
            <p className="mt-1 text-sm text-mist">SMP · 32 siswa · Kurikulum Merdeka · sisa 30 menit</p>
            <ul className="mt-5 space-y-3">
              {rows.map((row, index) => (
                <li key={row.label} className="rounded-2xl bg-paper px-4 py-3">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-pine">
                    {row.label}
                    {index > 1 ? <Lock className="h-3.5 w-3.5" /> : null}
                  </div>
                  <p className={`mt-1 text-sm leading-relaxed ${index > 1 ? "locked-line" : ""}`}>{row.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-pine px-4 py-3 text-sm text-sheet">
              <span>Checklist malam ini</span>
              <span className="font-bold">30 menit</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
