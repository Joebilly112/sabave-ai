"use client";

import { useEffect, useState } from "react";
import { formatIdr } from "@/lib/price";
import { Button, Lamp } from "@/components/ui";

type Signal = { title: string; detail: string; tone: "baik" | "waspada" };
type Band = "merah" | "kuning" | "hijau";

type HasilBase = {
  id: string;
  price: number;
  paymentReady: boolean;
  teaser: string;
  input: {
    role: string;
    company: string;
    pay: string;
    durationWeeks: number;
    supervisor: string;
  };
};

type PendingPayload = HasilBase & { status: "pending" };

type PaidPayload = HasilBase & {
  status: "paid";
  result: {
    band: Band;
    headline: string;
    summary: string;
    signals: Signal[];
    skills: string[];
    script: string;
  };
};

const BAND_LABEL: Record<Band, string> = {
  merah: "Merah",
  kuning: "Kuning",
  hijau: "Hijau",
};

export function ResultView({ id }: { id: string }) {
  const [data, setData] = useState<PendingPayload | PaidPayload | null>(null);
  const [missing, setMissing] = useState(false);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);

  async function load() {
    const response = await fetch(`/api/hasil/${id}`, { cache: "no-store" });
    if (response.status === 404) {
      setMissing(true);
      return;
    }
    const payload = (await response.json()) as PendingPayload | PaidPayload;
    setData(payload);
    if (payload.status === "paid") {
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "unlock_paid", path: `/hasil/${id}` }),
      });
    }
  }

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await fetch("/api/midtrans/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!cancelled) await load();
    })();
    return () => {
      cancelled = true;
    };
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
      const payload = (await response.json()) as { redirectUrl?: string; alreadyPaid?: boolean; error?: string };
      if (payload.alreadyPaid) {
        await load();
        setPaying(false);
        return;
      }
      if (!response.ok || !payload.redirectUrl) {
        setError(payload.error || "Pembayaran belum bisa dibuka.");
        setPaying(false);
        return;
      }
      window.location.href = payload.redirectUrl;
    } catch {
      setError("Koneksi ke pembayaran terputus.");
      setPaying(false);
    }
  }

  if (missing) {
    return <p className="mx-auto max-w-3xl px-5 py-16 text-pine">Hasil ini tidak ada, atau tautannya salah.</p>;
  }
  if (!data) {
    return <p className="mx-auto max-w-3xl px-5 py-16 text-mute">Membaca hasil…</p>;
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">
        {data.input.role} · {data.input.company}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-pine">Nilai karier magang ini</h1>
      <p className="mt-3 text-sm text-mute">
        {data.input.durationWeeks} minggu · {data.input.pay} · {data.input.supervisor}
      </p>

      {data.status === "pending" ? (
        <section className="mt-8 rounded-2xl border border-line bg-white p-6">
          <div className="flex gap-3">
            <Lamp tone="merah" label="Merah" />
            <Lamp tone="kuning" label="Kuning" />
            <Lamp tone="hijau" label="Hijau" />
          </div>
          <p className="mt-5 text-[15px] leading-7 text-ink/90">{data.teaser}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button type="button" variant="clay" onClick={() => void pay()} disabled={paying}>
              {paying ? "Membuka pembayaran…" : `Buka hasil · ${formatIdr(data.price)}`}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                void (async () => {
                  await fetch("/api/midtrans/sync", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id }),
                  });
                  await load();
                })();
              }}
            >
              Saya sudah bayar
            </Button>
          </div>
          {!data.paymentReady ? (
            <p className="mt-4 text-sm text-mute">Pembayaran Midtrans belum dipasang di server ini. Hasil tetap tersimpan.</p>
          ) : null}
          {error ? <p className="mt-3 text-sm font-medium text-ember">{error}</p> : null}
        </section>
      ) : (
        <PaidBody data={data} />
      )}
    </div>
  );
}

function PaidBody({ data }: { data: PaidPayload }) {
  const { result } = data;
  return (
    <div className="mt-8 space-y-6">
      <section className="rounded-2xl border border-line bg-white p-6">
        <Lamp tone={result.band} lit label={BAND_LABEL[result.band]} />
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-pine">{result.headline}</h2>
        <p className="mt-3 text-[15px] leading-7">{result.summary}</p>
      </section>
      <section className="rounded-2xl border border-line bg-cream p-6">
        <h2 className="text-lg font-semibold text-pine">Yang terbaca dari isianmu</h2>
        <ul className="mt-4 space-y-3">
          {result.signals.map((signal) => (
            <li key={signal.title}>
              <p className="text-sm font-semibold text-pine">
                {signal.tone === "baik" ? "Baik" : "Waspada"} · {signal.title}
              </p>
              <p className="text-sm leading-6 text-ink/80">{signal.detail}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-lg font-semibold text-pine">Minta ini di minggu pertama</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6">
          {result.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ol>
      </section>
      <section className="rounded-2xl bg-pine p-6 text-cream">
        <h2 className="text-lg font-semibold">Skrip ke pembimbing</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-cream/90">{result.script}</p>
      </section>
    </div>
  );
}
