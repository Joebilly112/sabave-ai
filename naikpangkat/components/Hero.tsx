"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SAMPLE_UNLOCK } from "@/lib/berkas";
import { SITE } from "@/lib/site";
import { BerkasReport } from "./BerkasReport";
import { Button, Container, Pill } from "./ui";

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <Container className="grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
      <div>
        <Pill tone="stamp">Tenang, ini urusan berkas</Pill>
        <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
          Berkas pangkatmu masih bolak-balik dari BKD?
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-ink/70">
          {SITE.question} Isi golongan, lama di pangkat, jenis jabatan, dan tahun SK. Yang terbuka: daftar berkas,
          alasan usulan sering kembali, dan kapan map sebaiknya sudah masuk.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button href="#mulai">Susun daftar saya</Button>
          <p className="text-sm font-semibold text-ink/70">{SITE.priceLabel} sekali · bukan hitung gaji</p>
        </div>
      </div>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <BerkasReport unlock={SAMPLE_UNLOCK} locked sample />
      </motion.div>
    </Container>
  );
}
