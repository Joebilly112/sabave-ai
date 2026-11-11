"use client";

import { useEffect, useState } from "react";
import { BandPill, Button, Panel } from "@/components/ui";
import { CAREGIVER_LABEL, FREQUENCY_LABEL, LENGTH_LABEL, SIGN_LABEL, TOPIC_LABEL } from "@/lib/labels";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";
import type { ClosenessInput, ClosenessResult } from "@/lib/types";

export function ResultView({
  id,
  status,
  input,
  unlock,
}: {
  id: string;
  status: "pending" | "paid";
  input: ClosenessInput;
  unlock: ClosenessResult | null;
}) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const paid = status === "paid" && unlock !== null;

  useEffect(() => {
    if (paid) {
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "unlock_paid", path: `/hasil/${id}` }),
      });
      return;
    }
    void fetch("/api/midtrans/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((payload: { status?: string }) => {
        if (payload.status === "paid") window.location.reload();
      })
      .catch(() => undefined);
  }, [id, paid]);

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
        window.location.reload();
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

  return (
    <section className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dusk">Laporan kedekatan</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night">
        {paid && unlock ? unlock.headline : "Catatanmu tersimpan. Pita dan rencana masih terkunci."}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {paid && unlock ? <BandPill band={unlock.band}>{unlock.bandLabel}</BandPill> : <BandPill band="kunci">Terkunci</BandPill>}
        <span className="text-sm text-mute">
          Anak {input.childAge} tahun · terpisah {input.yearsApart} tahun
        </span>
      </div>

      <Panel className="mt-6 p-5">
        <h2 className="text-sm font-semibold text-ink">Yang kamu isi</h2>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-mute">Pengasuh sehari-hari</dt>
            <dd>{CAREGIVER_LABEL[input.caregiver]}</dd>
          </div>
          <div>
            <dt className="text-mute">Irama</dt>
            <dd>{FREQUENCY_LABEL[input.frequency]}</dd>
          </div>
          <div>
            <dt className="text-mute">Lama panggilan</dt>
            <dd>{LENGTH_LABEL[input.length]}</dd>
          </div>
          <div>
            <dt className="text-mute">Isi obrolan</dt>
            <dd>{TOPIC_LABEL[input.topic]}</dd>
          </div>
          <div>
            <dt className="text-mute">Sisa kontrak</dt>
            <dd>{input.monthsLeft} bulan</dd>
          </div>
          <div>
            <dt className="text-mute">Tanda</dt>
            <dd>{input.signs.map((sign) => SIGN_LABEL[sign]).join(", ")}</dd>
          </div>
        </dl>
      </Panel>

      {paid && unlock ? (
        <div className="mt-6 space-y-4">
          <Panel className="p-5">
            <h2 className="text-lg font-semibold text-night">Tiga kebiasaan yang paling kentara</h2>
            <ul className="mt-4 space-y-3">
              {unlock.habits.map((habit) => (
                <li key={habit.title} className="rounded-2xl border border-line px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-dusk">
                    {habit.tone === "membantu" ? "Membantu" : "Mengganggu"}
                  </p>
                  <p className="mt-1 font-semibold text-ink">{habit.title}</p>
                  <p className="mt-1 text-sm leading-6 text-mute">{habit.detail}</p>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-semibold text-night">Rencana panggilan minggu ini</h2>
            <p className="mt-2 text-sm leading-6 text-ink">{unlock.plan.rhythm}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-leaf">Yang ditanyakan</p>
                <ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-6 text-ink/90">
                  {unlock.plan.ask.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-rose">Yang dihindari</p>
                <ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-6 text-ink/90">
                  {unlock.plan.avoid.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-semibold text-night">Naskah untuk pengasuh</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink">{unlock.caregiverScript}</p>
          </Panel>
          <ul className="space-y-2 text-sm leading-6 text-mute">
            {unlock.assumptions.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ) : (
        <Panel className="mt-6 p-5">
          <h2 className="text-lg font-semibold text-night">Buka sekali, tanpa langganan</h2>
          <p className="mt-2 text-sm leading-6 text-mute">
            {formatRupiah(UNLOCK_PRICE_IDR)} membuka pita, tiga kebiasaan, rencana sesuai usia, dan naskah singkat
            untuk pengasuh. Bayar dengan QRIS atau dompet. Ini bukan penilaian klinis.
          </p>
          <Button type="button" className="mt-4" onClick={pay} disabled={pending}>
            {pending ? "Membuka pembayaran…" : `Buka laporan · ${formatRupiah(UNLOCK_PRICE_IDR)}`}
          </Button>
          {error ? <p className="mt-3 text-sm text-rose">{error}</p> : null}
        </Panel>
      )}
    </section>
  );
}
