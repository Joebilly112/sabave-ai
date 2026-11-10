"use client";

import { useEffect, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { Button, Pill } from "@/components/ui";
import type { ScanResult } from "@/lib/scan";

type Payload = {
  id: string;
  status: "pending" | "paid";
  price: number;
  paymentReady: boolean;
  input: { role: string; years: number };
  teaser?: string;
  visibility?: number;
  result?: ScanResult;
  error?: string;
};

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

const actionLabel = { simpan: "Simpan", potong: "Potong", tambah: "Tambah" } as const;

export function ResultView({ id }: { id: string }) {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);

  async function load() {
    const response = await fetch(`/api/hasil/${id}`, { cache: "no-store" });
    const payload = (await response.json()) as Payload;
    if (!response.ok) {
      setError(payload.error || "Audit tidak ditemukan.");
      return;
    }
    setData(payload);
  }

  useEffect(() => {
    let stop = false;
    void (async () => {
      await fetch("/api/midtrans/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!stop) await load();
    })();
    return () => {
      stop = true;
    };
    // load is stable enough for this page; id is the only key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function pay() {
    setPaying(true);
    setError("");
    try {
      const response = await fetch("/api/midtrans/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const payload = (await response.json()) as { redirectUrl?: string; error?: string };
      if (!response.ok || !payload.redirectUrl) {
        setError(payload.error || "Pembayaran belum bisa dibuka.");
        setPaying(false);
        return;
      }
      window.location.href = payload.redirectUrl;
    } catch {
      setError("Pembayaran tidak tersambung.");
      setPaying(false);
    }
  }

  if (error && !data) {
    return <p className="mx-auto max-w-3xl px-5 py-16 text-signal">{error}</p>;
  }
  if (!data) {
    return <p className="mx-auto max-w-3xl px-5 py-16 text-mute">Membuka audit…</p>;
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <Pill tone="signal">Untuk peran {data.input.role}</Pill>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        {data.status === "paid" ? "Yang bikin lamaran ini senyap" : "Audit sudah siap, detailnya masih terkunci"}
      </h1>
      <p className="mt-3 text-mute">
        {data.input.years === 0 ? "Baru lulus" : `${data.input.years} tahun pengalaman`} · {formatPrice(data.price)} sekali
      </p>

      {data.status !== "paid" ? (
        <section className="mt-8 rounded-[28px] border border-line bg-card p-6 shadow-card">
          <div className="flex items-start gap-3">
            <LockKeyhole className="mt-1 text-signal" size={18} />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mute">Sebelum dibuka</p>
              <p className="mt-2 text-3xl font-semibold tabular-nums">{data.visibility ?? "–"}</p>
              <p className="text-sm text-mute">skor keterlihatan untuk peran ini, dari 100</p>
              <p className="mt-4 text-base leading-relaxed">{data.teaser}</p>
            </div>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-ink/80">
            <li>Celah kata kunci dibanding peran yang dilamar</li>
            <li>Tanda format yang sering bikin file dilewati</li>
            <li>Paragraf ringkasan yang ditulis ulang</li>
            <li>Daftar simpan, potong, dan tambah untuk satu halaman</li>
          </ul>
          {data.paymentReady ? (
            <Button className="mt-6" onClick={pay} disabled={paying}>
              {paying ? "Membuka pembayaran…" : `Buka hasil · ${formatPrice(data.price)}`}
            </Button>
          ) : (
            <p className="mt-6 text-sm leading-relaxed text-mute">
              Kunci Midtrans belum terpasang di server ini. Audit tetap tersimpan. Setelah kunci sandbox ada, tombol bayar membuka QRIS.
            </p>
          )}
          {error ? <p className="mt-3 text-sm text-signal">{error}</p> : null}
        </section>
      ) : (
        <PaidResult result={data.result} />
      )}
    </div>
  );
}

function PaidResult({ result }: { result?: ScanResult }) {
  if (!result) return null;
  return (
    <div className="mt-8 space-y-6">
      <section className="rounded-[28px] border border-line bg-ink p-6 text-paper">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">Keterlihatan {result.visibility}</p>
        <p className="mt-3 text-lg leading-relaxed">{result.verdict}</p>
      </section>
      <section className="rounded-[28px] border border-line bg-card p-6">
        <h2 className="text-lg font-semibold">Ringkasan yang ditulis ulang</h2>
        <p className="mt-3 leading-relaxed">{result.summary}</p>
      </section>
      <section className="rounded-[28px] border border-line bg-card p-6">
        <h2 className="text-lg font-semibold">Kata kunci peran</h2>
        <ul className="mt-4 space-y-3">
          {result.keywords.map((row) => (
            <li key={row.term} className="flex gap-3 text-sm leading-relaxed">
              <span className={row.present ? "font-semibold text-tide" : "font-semibold text-signal"}>
                {row.present ? "Ada" : "Hilang"}
              </span>
              <span>
                <span className="font-semibold">{row.term}. </span>
                {row.why}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-[28px] border border-line bg-card p-6">
        <h2 className="text-lg font-semibold">Tanda format</h2>
        <ul className="mt-4 space-y-4">
          {result.flags.map((flag) => (
            <li key={flag.title}>
              <p className="font-semibold">
                {flag.title}{" "}
                <span className="text-xs uppercase tracking-[0.12em] text-mute">{flag.severity}</span>
              </p>
              <p className="mt-1 text-sm leading-relaxed text-mute">{flag.detail}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-[28px] border border-line bg-card p-6">
        <h2 className="text-lg font-semibold">Simpan, potong, tambah</h2>
        <ul className="mt-4 space-y-3">
          {result.checklist.map((row) => (
            <li key={row.text} className="text-sm leading-relaxed">
              <span className="mr-2 font-semibold uppercase tracking-[0.12em] text-tide">{actionLabel[row.action]}</span>
              {row.text}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
