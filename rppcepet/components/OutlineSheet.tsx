"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import type { Outline } from "@/lib/types";
import { outlinePlainText } from "@/lib/outline";

export function OutlineSheet({ outline }: { outline: Outline }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(outlinePlainText(outline));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="rounded-[28px] border border-line bg-sheet p-6 shadow-sheet sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-pine">Kerangka malam ini</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{outline.identitas}</h1>
      <p className="mt-3 text-sm leading-relaxed text-mist">{outline.durasiKelas}</p>

      <section className="mt-8">
        <h2 className="text-lg font-extrabold">Tujuan</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
          {outline.tujuan.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-extrabold">Langkah</h2>
        <ul className="mt-3 space-y-3">
          {outline.langkah.map((item) => (
            <li key={item.fase} className="rounded-2xl bg-paper px-4 py-3">
              <p className="text-sm font-bold">
                {item.fase} · {item.menit} menit
              </p>
              <p className="mt-1 text-sm leading-relaxed text-mist">{item.isi}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-extrabold">Asesmen</h2>
        <ul className="mt-3 space-y-3">
          {outline.asesmen.map((item) => (
            <li key={item.nama}>
              <p className="text-sm font-bold">{item.nama}</p>
              <p className="text-sm leading-relaxed text-mist">{item.cara}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-extrabold">Checklist sebelum tidur</h2>
        <ul className="mt-3 space-y-2">
          {outline.checklist.map((item) => (
            <li key={item.tugas} className="flex gap-3 text-sm leading-relaxed">
              <span className="w-16 shrink-0 font-bold text-pine">{item.menit} mnt</span>
              <span>{item.tugas}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-extrabold">Lampu merah</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          {outline.redFlags.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-sm leading-relaxed text-mist">{outline.catatan}</p>
      <div className="mt-6">
        <Button tone="ink" onClick={() => void copy()}>
          {copied ? "Tersalin" : "Salin kerangka"}
        </Button>
      </div>
    </article>
  );
}
