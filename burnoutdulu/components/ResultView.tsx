"use client";

import { useEffect, useState } from "react";
import { BandPill, Button, Panel } from "@/components/ui";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";
import { symptomLabel } from "@/lib/symptoms";
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

  const sleep = input.sleepHours.toLocaleString("id-ID", { maximumFractionDigits: 1 });

  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember">Pita beban freelancer</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-4xl font-semibold tracking-tight text-dusk">
          {shown ? shown.bandLabel : "Pita masih tertutup"}
        </h1>
        {shown ? <BandPill band={shown.band}>{shown.band}</BandPill> : <BandPill band="kunci">Terkunci</BandPill>}
      </div>
      <p className="mt-4 text-sm leading-6 text-mute">
        {shown
          ? shown.headline
          : `Ringkasan isian ada di bawah. Pita hijau, amber, atau merah, rencana 14 hari, dan naskah klien terbuka setelah ${formatRupiah(UNLOCK_PRICE_IDR)}.`}
      </p>

      <Panel className="mt-6 p-5">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-mute">Jam seminggu</dt>
            <dd className="font-semibold text-ink">{input.hoursWeek}</dd>
          </div>
          <div>
            <dt className="text-mute">Klien aktif</dt>
            <dd className="font-semibold text-ink">{input.activeClients}</dd>
          </div>
          <div>
            <dt className="text-mute">Tidur</dt>
            <dd className="font-semibold text-ink">{sleep} jam</dd>
          </div>
          <div>
            <dt className="text-mute">Hari tanpa kerja</dt>
            <dd className="font-semibold text-ink">{input.daysOff} dalam 30 hari</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-6 text-ink">
          {input.symptoms.length
            ? `Sinyal yang dicentang: ${input.symptoms.map((item) => symptomLabel[item]).join("; ")}.`
            : "Tidak ada sinyal tubuh yang dicentang."}
        </p>
      </Panel>

      {shown ? (
        <div className="mt-6 space-y-4">
          <Panel className="p-5">
            <h2 className="text-lg font-semibold text-dusk">Rencana potong beban, 14 hari</h2>
            <p className="mt-2 text-sm text-mute">Pendorong utama: {shown.driverLabel}. Skor pola {shown.score} dari 15.</p>
            <ol className="mt-4 space-y-4">
              {shown.plan.map((step) => (
                <li key={step.window}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
                    {step.window} · {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-ink">{step.action}</p>
                </li>
              ))}
            </ol>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-semibold text-dusk">
              {shown.scriptKind === "selesai" ? "Naskah mengakhiri satu klien" : "Naskah menjeda satu klien"}
            </h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-ink">{shown.clientScript}</p>
            <p className="mt-3 text-xs leading-5 text-mute">Ganti sapaan dengan nama klien. Kirim di jam kerja, bukan tengah malam.</p>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-semibold text-dusk">Yang dipakai menghitung</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-ink">
              {shown.assumptions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Panel>
        </div>
      ) : (
        <Panel className="mt-6 p-5">
          <h2 className="text-lg font-semibold text-dusk">Buka pita</h2>
          <p className="mt-2 text-sm leading-6 text-mute">
            {formatRupiah(UNLOCK_PRICE_IDR)} sekali, lewat GoPay, ShopeePay, atau QRIS. Tidak ada langganan.
          </p>
          <Button type="button" className="mt-4" onClick={pay} disabled={pending}>
            {pending ? "Membuka pembayaran…" : `Bayar ${formatRupiah(UNLOCK_PRICE_IDR)}`}
          </Button>
          {error ? <p className="mt-3 text-sm text-clay">{error}</p> : null}
        </Panel>
      )}
      <p className="mt-6 text-sm leading-6 text-mute">
        Ini bukan diagnosis medis. Kalau kamu merasa tidak aman, tidak bisa berfungsi, atau takut pada hari itu sendiri,
        hubungi orang terdekat atau layanan kesehatan. Into The Light Indonesia dan 119 ext 8 bisa jadi pintu awal.
      </p>
    </section>
  );
}
