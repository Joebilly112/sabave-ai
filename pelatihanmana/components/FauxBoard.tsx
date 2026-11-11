"use client";

import { motion } from "framer-motion";
import { RankList } from "@/components/RankList";
import { sampleBoard } from "@/lib/recommend";

const sample = sampleBoard();

export function FauxBoard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative rounded-[28px] border border-line bg-panel p-5 shadow-card sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-lime">Contoh papan</p>
          <p className="mt-1 text-sm text-mist">Ns. Rani · rawat inap · 4 tahun · tujuan ICU</p>
        </div>
        <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-semibold text-mist">bukan hasilmu</span>
      </div>
      <RankList next={sample.next} skip={sample.skip} />
    </motion.div>
  );
}
