"use client";

import { motion } from "framer-motion";
import { Phone, Video } from "lucide-react";
import { BandPill } from "@/components/ui";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dusk">Untuk orang tua yang kerja jauh</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night sm:text-5xl">
          Anak masih dekat, atau panggilan sudah terasa asing?
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-mute">
          Rindu yang bercampur rasa bersalah sering muncul saat anak diam di video, lebih memilih nenek, atau ulang
          tahun lagi terlewat. Isi usia, lama terpisah, pengasuh, irama panggilan, dan tanda terakhir.
        </p>
        <p className="mt-4 max-w-xl text-sm leading-6 text-ink/80">
          Sekali bayar Rp14.900 untuk pita dekat, renggang, atau perlu perhatian, tiga kebiasaan, rencana mingguan
          sesuai usia, dan naskah untuk pengasuh. Bukan diagnosis.
        </p>
      </div>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="relative mx-auto max-w-md rounded-[36px] bg-night p-3 shadow-card">
          <div className="absolute -left-3 top-16 h-16 w-3 rounded-full bg-lamp/80 blur-md" aria-hidden />
          <div className="rounded-[28px] bg-[#241833] px-4 pb-4 pt-3 text-paper">
            <div className="mb-4 flex items-center justify-between text-[11px] text-paper/60">
              <span className="inline-flex items-center gap-1">
                <Video className="h-3.5 w-3.5 text-lamp" aria-hidden />
                Panggilan minggu ini
              </span>
              <span>07:12</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl bg-[#312246] px-3 py-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lamp text-night">
                  <Phone className="h-5 w-5" aria-hidden />
                </div>
                <p className="mt-3 text-sm font-semibold">Kamu</p>
                <p className="text-[11px] text-paper/50">dari jauh</p>
              </div>
              <div className="rounded-3xl bg-[#312246] px-3 py-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-paper text-lg font-semibold text-night">
                  A
                </div>
                <p className="mt-3 text-sm font-semibold">Adik, 8 th</p>
                <p className="text-[11px] text-paper/50">di rumah nenek</p>
              </div>
            </div>
            <div className="mt-4 rounded-3xl bg-paper p-4 text-ink">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mute">Contoh, bukan data sungguhan</p>
                <BandPill band="renggang">Renggang</BandPill>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="rounded-2xl bg-amber-50 px-3 py-2 text-amber-900">Nilai dibuka lebih dulu</li>
                <li className="rounded-2xl bg-emerald-50 px-3 py-2 text-leaf">Satu janji seminggu masih ada</li>
                <li className="rounded-2xl bg-mist px-3 py-2">Nenek sudah jadi rumah sehari-hari</li>
              </ul>
              <div className="mt-3 rounded-2xl bg-mist px-3 py-3">
                <p className="text-xs font-semibold text-dusk">Rencana minggu ini</p>
                <p className="mt-1 select-none text-sm leading-5 text-ink/35 blur-[3px]">
                  Tanya satu cerita hari ini. Jangan mulai dari rapor. Sepuluh menit, jam yang sama.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
