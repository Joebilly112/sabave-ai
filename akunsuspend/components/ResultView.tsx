"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BandPill, Button, Panel } from "@/components/ui";
import { platformLabel, suspendLabel } from "@/lib/band";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";
import type { CekInput, CekResult } from "@/lib/types";

export function ResultView({
  id,
  status,
  input,
  unlock,
}: {
  id: string;
  status: "pending" | "paid";
  input: CekInput;
  unlock: CekResult | null;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (status === "paid") return;
    let stop = false;
    void (async () => {
      const response = await fetch("/api/midtrans/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const payload = (await response.json()) as { status?: string };
      if (!stop && payload.status === "paid") {
        void fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "unlock_paid", path: `/hasil/${id}` }),
        });
        router.refresh();
      }
    })();
    return () => {
      stop = true;
    };
  }, [id, router, status]);

  async function pay() {
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/midtrans/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const payload = (await response.json()) as { redirectUrl?: string; alreadyPaid?: boolean; error?: string };
      if (payload.alreadyPaid) {
        router.refresh();
        return;
      }
      if (!response.ok || !payload.redirectUrl) {
        setError(payload.error || "Pembayaran belum bisa dibuka.");
        setPending(false);
        return;
      }
      window.location.href = payload.redirectUrl;
    } catch {
      setError("Koneksi ke pembayaran terputus.");
      setPending(false);
    }
  }

  const days =
    input.daysLeft === null ? "sisa hari tidak tertulis" : input.daysLeft === 0 ? "sisa hari habis" : `${input.daysLeft} hari tersisa`;

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flare">Berkas banding</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night">
        {platformLabel(input.platform)} · {suspendLabel(input.suspendType)}
      </h1>
      <p className="mt-3 text-sm text-mist">
        {days} · {input.warnings} peringatan tercatat di isian
        {input.reason ? ` · “${input.reason}”` : ""}
      </p>

      {status !== "paid" || !unlock ? (
        <Panel className="mt-8 p-6 sm:p-8">
          <BandPill band="kunci">Terkunci</BandPill>
          <h2 className="mt-4 text-2xl font-semibold text-night">Langkah 48 jam sudah disusun</h2>
          <p className="mt-3 text-sm leading-6 text-mist">
            Pita keparahan, daftar bukti, timeline, larangan akun kedua, dan naskah banding terbuka setelah{" "}
            {formatRupiah(UNLOCK_PRICE_IDR)}. Ini informasi, bukan janji akun nyala.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-ink">
            <li className="rounded-2xl bg-foam px-4 py-3 blur-[2px]">Pita keparahan dari jenis suspend dan sisa waktu</li>
            <li className="rounded-2xl bg-foam px-4 py-3 blur-[2px]">Bukti yang dilampirkan sebelum chat</li>
            <li className="rounded-2xl bg-foam px-4 py-3 blur-[2px]">Yang jangan dilakukan 48 jam ini</li>
          </ul>
          {error ? <p className="mt-4 text-sm text-flare">{error}</p> : null}
          <Button className="mt-6" onClick={pay} disabled={pending}>
            {pending ? "Membuka pembayaran…" : `Buka berkas · ${formatRupiah(UNLOCK_PRICE_IDR)}`}
          </Button>
        </Panel>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
          <Panel className="p-6 sm:p-8">
            <BandPill band={unlock.band}>{unlock.bandLabel}</BandPill>
            <h2 className="mt-4 text-2xl font-semibold text-night">{unlock.headline}</h2>
            <p className="mt-3 text-sm leading-6 text-ink">{unlock.channel}</p>
          </Panel>

          <Panel className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Daftar bukti</h3>
            <ol className="mt-4 space-y-4">
              {unlock.checklist.map((item) => (
                <li key={item.title}>
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-mist">{item.detail}</p>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold">24–48 jam ke depan</h3>
            <ol className="mt-4 space-y-4">
              {unlock.timeline.map((step) => (
                <li key={step.window} className="rounded-2xl border border-line px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-flare">{step.window}</p>
                  <p className="mt-1 font-semibold">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-mist">{step.action}</p>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Jangan dilakukan</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6">
              {unlock.avoid.map((item) => (
                <li key={item} className="rounded-2xl bg-red-50 px-4 py-3 text-red-900">
                  {item}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Naskah banding</h3>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink">{unlock.appealDraft}</p>
          </Panel>

          <ul className="space-y-2 text-xs leading-5 text-mist">
            {unlock.assumptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
