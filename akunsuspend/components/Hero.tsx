"use client";

import { motion } from "framer-motion";
import { Ban, Clock3, ShieldAlert } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="overflow-hidden bg-night text-foam">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hazard">Mitra ojek · akun terkunci</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Akun kena suspend. Banding apa dulu, sebelum putus mitra?
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-foam/75">
            Panik karena order berhenti hari ini wajar. Yang berbahaya adalah membuka akun kedua atau chat orang yang
            mengaku admin. Susun pita keparahan, bukti, dan 48 jam pertama dari layar yang benar-benar kamu lihat.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#cek" className="rounded-full bg-hazard px-5 py-3 text-sm font-semibold text-night shadow-glow">
              Susun langkah banding
            </Link>
            <Link href="/artikel/empat-puluh-delapan-jam-pertama" className="rounded-full border border-white/15 px-5 py-3 text-sm text-foam">
              Baca 48 jam pertama
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="rounded-[32px] border border-white/10 bg-asphalt p-4 shadow-phone">
            <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-wider text-foam/50">
              <span>Contoh tampilan</span>
              <span>22:14</span>
            </div>
            <div className="rounded-3xl bg-night p-5">
              <div className="flex items-center gap-2 text-xs text-hazard">
                <ShieldAlert className="h-4 w-4" />
                Gojek · suspend sementara
              </div>
              <p className="mt-4 text-2xl font-semibold">Akun ditangguhkan</p>
              <p className="mt-1 text-sm text-foam/60">Order tidak masuk. Tombol banding masih terlihat.</p>
              <div className="mt-5 flex items-end justify-between rounded-2xl bg-asphalt px-4 py-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-foam/50">Sisa banding</p>
                  <p className="text-3xl font-semibold text-hazard">2 hari</p>
                </div>
                <Clock3 className="mb-1 h-5 w-5 text-hazard" />
              </div>
              <div className="mt-4 space-y-2">
                {["Daftar bukti", "Timeline 24–48 jam", "Jangan buka akun kedua"].map((row) => (
                  <div key={row} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm">
                    <span className="blur-[3px]">{row}</span>
                    <Ban className="h-3.5 w-3.5 text-flare" />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-[11px] text-foam/40">Terbuka setelah sekali bayar · contoh, bukan akun sungguhan</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
