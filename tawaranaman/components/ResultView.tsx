"use client";

import { useEffect, useState } from "react";
import { BandPill, Button, Panel } from "@/components/ui";
import {
  CONTRACT_LABEL,
  DOC_LABEL,
  FEE_WHEN_LABEL,
  LOAN_LABEL,
  SISKO_LABEL,
  SOURCE_LABEL,
  VISA_LABEL,
} from "@/lib/labels";
import { formatRupiah } from "@/lib/price";
import type { OfferInput, OfferResult } from "@/lib/types";

function needsFreeWarning(input: OfferInput): boolean {
  return (
    input.visa === "wisata" ||
    input.visa === "umrah" ||
    input.documents.includes("ijazah-asli") ||
    input.documents.includes("paspor")
  );
}

export function ResultView({
  id,
  status,
  input,
  unlock,
}: {
  id: string;
  status: "pending" | "paid";
  input: OfferInput;
  unlock: OfferResult | null;
}) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const paid = status === "paid";
  const report = unlock;

  useEffect(() => {
    if (paid) return;
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

  const feeLine =
    input.feeWhen === "tidak-diminta" ? FEE_WHEN_LABEL[input.feeWhen] : `${formatRupiah(input.feeIdr)} · ${FEE_WHEN_LABEL[input.feeWhen]}`;

  return (
    <section className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sea">Laporan tawaran</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-deep">
        {paid && report ? report.headline : "Laporan tersimpan. Pita dan naskah masih terkunci."}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {paid && report ? <BandPill band={report.band}>{report.bandLabel}</BandPill> : <BandPill band="kunci">Terkunci</BandPill>}
        <span className="text-sm text-mute">{input.country}</span>
      </div>

      {needsFreeWarning(input) ? (
        <p className="mt-6 rounded-2xl border border-coral/30 bg-red-50 px-4 py-3 text-sm leading-6 text-coral">
          Visa kunjungan atau dokumen asli yang diminta sudah cukup untuk berhenti dulu. Jangan transfer dan jangan
          serahkan paspor atau ijazah. Cek nama penyalur di Migran Aman, dan hubungi 112 jika kamu sedang takut.
        </p>
      ) : null}

      <Panel className="mt-6 p-5">
        <h2 className="text-sm font-semibold text-ink">Yang kamu isi</h2>
        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-mute">Sumber</dt>
            <dd>{SOURCE_LABEL[input.source]}</dd>
          </div>
          <div>
            <dt className="text-mute">Visa</dt>
            <dd>{VISA_LABEL[input.visa]}</dd>
          </div>
          <div>
            <dt className="text-mute">Biaya</dt>
            <dd>{feeLine}</dd>
          </div>
          <div>
            <dt className="text-mute">Pinjaman</dt>
            <dd>{LOAN_LABEL[input.loan]}</dd>
          </div>
          <div>
            <dt className="text-mute">Dokumen</dt>
            <dd>{input.documents.map((item) => DOC_LABEL[item]).join(", ")}</dd>
          </div>
          <div>
            <dt className="text-mute">SISKOP2MI</dt>
            <dd>{SISKO_LABEL[input.siskoOwn]}</dd>
          </div>
          <div>
            <dt className="text-mute">Kontrak</dt>
            <dd>{CONTRACT_LABEL[input.contractShown]}</dd>
          </div>
        </dl>
      </Panel>

      {paid && report ? (
        <div className="mt-6 space-y-6">
          <Panel className="p-5">
            <h2 className="text-lg font-semibold text-deep">Tanda yang ketahuan</h2>
            {report.flags.length === 0 ? (
              <p className="mt-3 text-sm leading-6 text-mute">Tidak ada tanda keras di isian ini. Tetap cocokkan nama penyalur di situs resmi.</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {report.flags.map((flag) => (
                  <li key={flag.title}>
                    <p className="font-semibold text-ink">{flag.title}</p>
                    <p className="text-sm leading-6 text-mute">{flag.detail}</p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-semibold text-deep">Cek resmi berikutnya</h2>
            <ol className="mt-3 space-y-3">
              {report.checks.map((check, index) => (
                <li key={check.title}>
                  <p className="font-semibold text-ink">
                    {index + 1}. {check.title}
                  </p>
                  <p className="text-sm leading-6 text-mute">{check.detail}</p>
                  {check.href ? (
                    <a href={check.href} className="text-sm font-semibold text-sea" rel="noreferrer">
                      Buka situs resmi
                    </a>
                  ) : null}
                </li>
              ))}
            </ol>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-semibold text-deep">Naskah untuk menolak</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink">{report.refusalScript}</p>
            <button
              type="button"
              className="mt-4 text-sm font-semibold text-sea"
              onClick={() => void navigator.clipboard.writeText(report.refusalScript)}
            >
              Salin naskah
            </button>
          </Panel>
          <ul className="space-y-1 text-xs leading-5 text-mute">
            {report.assumptions.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ) : (
        <Panel className="mt-6 p-5">
          <h2 className="text-lg font-semibold text-deep">Buka pita, tanda, dan naskah</h2>
          <p className="mt-2 text-sm leading-6 text-mute">
            Sekali bayar {formatRupiah(9900)} lewat QRIS atau dompet digital. Kamu mendapat pita aman, waspada, atau
            bahaya, tanda dari isianmu, langkah cek resmi, dan kalimat tolak yang sopan.
          </p>
          <Button className="mt-4" type="button" onClick={() => void pay()} disabled={pending}>
            {pending ? "Membuka pembayaran…" : `Bayar ${formatRupiah(9900)}`}
          </Button>
          {error ? <p className="mt-3 text-sm text-coral">{error}</p> : null}
          <p className="mt-4 text-xs leading-5 text-mute">
            Dua situs resmi tetap gratis: Migran Aman untuk cek legalitas, dan SISKOP2MI untuk lowongan di akunmu.
            Laporan ini tidak menetapkan seseorang bersalah.
          </p>
        </Panel>
      )}
    </section>
  );
}
