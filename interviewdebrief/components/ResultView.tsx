"use client";

import { useEffect, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { Button, ScoreBar } from "@/components/ui";
import { FORMAT_LABEL, GUT_LABEL, SCORE_LABEL, type DebriefResult, type ScoreKey } from "@/lib/debrief";
import { formatIdr } from "@/lib/price";

type Locked = {
  id: string;
  status: "pending";
  price: number;
  input: { role: string; format: "hr" | "user" | "case"; durationMinutes: number; gut: "yakin" | "campur" | "kacau" };
  paymentReady: boolean;
};

type Opened = {
  id: string;
  status: "paid";
  price: number;
  input: Locked["input"];
  result: DebriefResult;
  paymentReady: boolean;
};

const ORDER: ScoreKey[] = ["struktur", "kejelasan", "contoh", "pertanyaanBalik"];

export function ResultView({ id }: { id: string }) {
  const [data, setData] = useState<Locked | Opened | null>(null);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    let stop = false;
    async function load() {
      await fetch("/api/midtrans/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const response = await fetch(`/api/hasil/${id}`, { cache: "no-store" });
      const body = (await response.json()) as (Locked | Opened) & { error?: string };
      if (stop) return;
      if (!response.ok) {
        setError(body.error || "Debrief tidak ditemukan.");
        return;
      }
      setData(body);
    }
    void load();
    return () => {
      stop = true;
    };
  }, [id]);

  async function pay() {
    setPaying(true);
    setError("");
    const response = await fetch("/api/midtrans/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const body = (await response.json()) as { redirectUrl?: string; error?: string };
    if (response.ok && body.redirectUrl) {
      window.location.href = body.redirectUrl;
      return;
    }
    setError(body.error || "Pembayaran belum bisa dibuka.");
    setPaying(false);
  }

  if (error && !data) {
    return <p className="text-rose">{error}</p>;
  }
  if (!data) {
    return <p className="text-mute">Membuka catatan debrief…</p>;
  }

  return (
    <div className="ink-ring rounded-[28px] bg-card p-5 shadow-card sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">
        {data.status === "paid" ? "Terbuka" : "Terkunci"}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{data.input.role}</h1>
      <p className="mt-1 text-sm text-mute">
        {FORMAT_LABEL[data.input.format]} · {data.input.durationMinutes} menit · rasa: {GUT_LABEL[data.input.gut]}
      </p>

      {data.status === "pending" ? (
        <div className="mt-8">
          <div className="grid place-items-center rounded-3xl bg-paper px-6 py-10 text-center">
            <LockKeyhole className="h-6 w-6" />
            <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">
              Catatanmu sudah disusun. Skor, tiga momen lemah, dan draf follow-up terbuka setelah pembayaran {formatIdr(data.price)}.
            </p>
            <Button className="mt-5" type="button" onClick={pay} disabled={paying || !data.paymentReady}>
              {paying ? "Membuka pembayaran…" : `Bayar ${formatIdr(data.price)}`}
            </Button>
            {!data.paymentReady ? (
              <p className="mt-3 text-xs text-mute">Kunci Midtrans belum dipasang di server ini.</p>
            ) : null}
          </div>
          {error ? <p className="mt-4 text-sm text-rose">{error}</p> : null}
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          <p className="text-lg leading-relaxed">{data.result.verdict}</p>
          <div className="space-y-4">
            {ORDER.map((key) => (
              <ScoreBar key={key} label={SCORE_LABEL[key]} score={data.result.scores[key]} note={data.result.notes[key]} />
            ))}
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-mute">Tiga momen lemah</h2>
            <ol className="mt-3 space-y-4">
              {data.result.weakest.map((moment, index) => (
                <li key={moment.title} className="rounded-2xl border border-line px-4 py-3">
                  <p className="font-semibold">{index + 1}. {moment.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-mute">{moment.detail}</p>
                  <p className="mt-2 text-sm leading-relaxed">{moment.fix}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-mute">Follow-up 48 jam</h2>
            <pre className="mt-3 whitespace-pre-wrap rounded-2xl bg-paper p-4 font-sans text-sm leading-relaxed">{data.result.followUp}</pre>
          </div>
          <ul className="space-y-2 text-sm text-mute">
            {data.result.signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
