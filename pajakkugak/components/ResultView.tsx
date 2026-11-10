"use client";

import { useEffect, useState } from "react";
import { bandLabel, npwpLabel, withheldLabel } from "@/lib/labels";
import { UNLOCK_PRICE_IDR, formatRupiah } from "@/lib/price";
import type { CekInput, CekResult } from "@/lib/types";
import { Button, Panel, Stamp } from "@/components/ui";

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
  const [paid, setPaid] = useState(status === "paid");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const shown = paid ? unlock : null;

  useEffect(() => {
    if (paid) return;
    void fetch("/api/midtrans/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((payload: { status?: string }) => {
        if (payload.status === "paid") {
          setPaid(true);
          window.location.reload();
        }
      })
      .catch(() => undefined);
  }, [id, paid]);

  useEffect(() => {
    if (!paid) return;
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "unlock_paid", path: `/hasil/${id}` }),
    });
  }, [id, paid]);

  async function pay() {
    setPending(true);
    setError("");
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
      setError("Jaringan terputus. Coba lagi.");
      setPending(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">Slip musim lapor</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-4xl font-semibold tracking-tight text-pine">
          {shown ? shown.verdictLabel : "Putusan masih tertutup"}
        </h1>
        {shown ? <Stamp>{shown.verdictLabel}</Stamp> : <Stamp tilt={6}>Terkunci</Stamp>}
      </div>
      <p className="mt-4 text-sm leading-6 text-mute">
        {shown
          ? shown.headline
          : "Ringkasan isian ada di bawah. Putusan wajib, mungkin, atau belum — beserta jalur formulir dan checklist — terbuka setelah pembayaran."}
      </p>

      <Panel className="mt-6 p-5">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-mute">Omzet bruto</dt>
            <dd className="font-semibold text-ink">{formatRupiah(input.annualGross)}</dd>
          </div>
          <div>
            <dt className="text-mute">NPWP</dt>
            <dd className="font-semibold text-ink">{npwpLabel[input.hasNpwp]}</dd>
          </div>
          <div>
            <dt className="text-mute">Pemotongan</dt>
            <dd className="font-semibold text-ink">{withheldLabel[input.withheld]}</dd>
          </div>
          <div>
            <dt className="text-mute">Pita yang kamu pilih</dt>
            <dd className="font-semibold text-ink">{bandLabel[input.omzetBand]}</dd>
          </div>
        </dl>
      </Panel>

      {shown ? (
        <div className="mt-6 space-y-4">
          <Panel className="p-5">
            <h2 className="text-lg font-semibold text-pine">Jalur formulir</h2>
            <p className="mt-2 text-sm leading-6 text-ink">{shown.formPath}</p>
            {shown.bandMismatch ? (
              <p className="mt-3 text-sm leading-6 text-stamp">
                Pita yang dipakai di peta: {bandLabel[shown.bandUsed]}. Angka dan pilihanmu tidak sama, jadi yang lebih hati-hati yang menang.
              </p>
            ) : null}
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-semibold text-pine">Checklist dokumen</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-ink">
              {shown.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-semibold text-pine">Pesan yang bisa kamu pakai</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-ink">{shown.clientNote}</p>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-semibold text-pine">Asumsi yang dipakai</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-mute">
              {shown.assumptions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Panel>
        </div>
      ) : (
        <Panel className="mt-6 p-5">
          <p className="text-sm leading-6 text-ink">
            Buka putusan, jalur 1770 atau tarif umum, checklist, dan pesan minta bukti potong. Sekali bayar {formatRupiah(UNLOCK_PRICE_IDR)}.
          </p>
          <Button className="mt-4" onClick={pay} disabled={pending}>
            {pending ? "Membuka pembayaran…" : `Buka dengan ${formatRupiah(UNLOCK_PRICE_IDR)}`}
          </Button>
          {error ? <p className="mt-3 text-sm text-stamp">{error}</p> : null}
        </Panel>
      )}
    </section>
  );
}
