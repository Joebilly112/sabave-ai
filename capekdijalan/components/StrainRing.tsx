"use client";

import { motion } from "framer-motion";
import { bandLabel } from "@/lib/labels";
import type { StrainBand } from "@/lib/types";

const STROKE: Record<StrainBand, string> = {
  ringan: "#2f6d56",
  berat: "#c7841e",
  bahaya: "#d4533a",
};

export function StrainRing({ score, band }: { score: number; band: StrainBand }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dash = (Math.min(100, Math.max(0, score)) / 100) * circumference;
  return (
    <div className="relative grid h-40 w-40 place-items-center">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={radius} stroke="#e4dccf" strokeWidth="12" fill="none" />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          stroke={STROKE[band]}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${dash} ${circumference}` }}
          transition={{ duration: 1.05, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-4xl font-semibold tracking-tight text-night">{score}</div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: STROKE[band] }}>
          {bandLabel[band]}
        </div>
      </div>
    </div>
  );
}
