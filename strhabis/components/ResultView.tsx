"use client";

import { useEffect, useState } from "react";
import { BandPill, Panel } from "@/components/ui";
import { PayBox } from "@/components/PayBox";
import { PLACE_LABEL, SIP_LABEL, type StoredCek } from "@/lib/types";

export function ResultView({ record }: { record: StoredCek }) {
  const [status, setStatus] = useState(record.status);
  const paid = status === "paid";

  useEffect(() => {
    if (paid) {
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "unlock_paid", path: `/hasil/${record.id}` }),
      });
      return;
    }
    void fetch("/api/midtrans/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: record.id }),
    })
      .then((response) => response.json())
      .then((payload: { status?: string }) => {
        if (payload.status === "paid") setStatus("paid");
      })
      .catch(() => undefined);
  }, [paid, record.id]);

  return (
    <section className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-wax">Hasil persiapan STR</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-4xl font-semibold tracking-tight text-seal">
          {paid ? record.result.countdownLabel : "Rencana masih terkunci"}
        </h1>
        {paid ? <BandPill band={record.result.band}>{record.result.bandLabel}</BandPill> : <BandPill band="kunci">Belum dibuka</BandPill>}
      </div>
      <p className="mt-4 text-sm leading-6 text-mute">
        Tempat praktik: {PLACE_LABEL[record.input.place]}. SIP: {SIP_LABEL[record.input.sip]}. Tanggal habis yang kamu isi:{" "}
        {record.input.expiresOn}.
      </p>

      {paid ? (
        <div className="mt-8 space-y-6">
          <Panel className="p-6">
            <h2 className="text-xl font-semibold text-seal">{record.result.headline}</h2>
            <p className="mt-3 text-sm leading-7 text-ink/90">{record.result.note}</p>
          </Panel>
          <Panel className="p-6">
            <h2 className="text-xl font-semibold text-seal">Dokumen yang disiapkan</h2>
            <ul className="mt-4 space-y-4">
              {record.result.documents.map((item) => (
                <li key={item.title} className="border-b border-line pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-seal">{item.title}</p>
                    <span className="text-xs font-semibold uppercase tracking-wide text-mute">
                      {item.tone === "siap" ? "Bahan ada" : item.tone === "kosong" ? "Masih kosong" : "Perlu dicek"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-mute">{item.detail}</p>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel className="p-6">
            <h2 className="text-xl font-semibold text-seal">Rencana minggu</h2>
            <ol className="mt-4 space-y-4">
              {record.result.weeks.map((week) => (
                <li key={week.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stamp">{week.label}</p>
                  <p className="mt-1 font-semibold text-seal">{week.title}</p>
                  <p className="mt-1 text-sm leading-6 text-mute">{week.detail}</p>
                </li>
              ))}
            </ol>
          </Panel>
          <ul className="space-y-2 text-xs leading-5 text-mute">
            {record.result.assumptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-8">
          <PayBox id={record.id} />
        </div>
      )}
    </section>
  );
}
