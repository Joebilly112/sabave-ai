"use client";

import { motion } from "framer-motion";
import { Moon, PhoneOff, Shield } from "lucide-react";

const nights = [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1];

export function Hero() {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="overflow-hidden rounded-[32px] bg-night text-linen shadow-card"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2 text-sm text-lamp">
            <Moon className="h-4 w-4" aria-hidden />
            Buku jaga 14 hari
          </div>
          <span className="rounded-full bg-lamp/20 px-3 py-1 text-xs font-semibold text-lamp">Contoh</span>
        </div>
        <div className="grid gap-6 p-5 md:grid-cols-[1.2fr_0.8fr] md:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-white/50">Pita beban</p>
            <p className="mt-2 text-3xl font-semibold text-lamp">Waspada</p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              9 malam on-call · 4 persalinan lewat tengah malam · tidur 4,5 jam
            </p>
            <div className="mt-5 flex gap-1.5" aria-hidden>
              {nights.map((on, index) => (
                <span
                  key={index}
                  className={`h-8 flex-1 rounded-md ${on ? "bg-lamp" : "bg-tide"}`}
                  title={on ? "On-call" : "Dilindungi"}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-white/50">Kuning menyala, hijau malam yang dikosongkan.</p>
          </div>
          <div className="rounded-3xl bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Shield className="h-4 w-4 text-lamp" aria-hidden />3 malam dilindungi
            </div>
            <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-white/75">
              <PhoneOff className="mt-1 h-4 w-4 shrink-0 text-lamp" aria-hidden />
              “Bu, kontrol rutin saya pindah ke siang. Persalinan yang sudah berjalan tetap tersambung ke rekan jaga.”
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
