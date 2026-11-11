"use client";

import { useEffect, useState } from "react";
import { BandPill, Panel } from "@/components/ui";
import { PayBox } from "@/components/PayBox";
import { BACKUP_LABEL, type StoredCek } from "@/lib/types";

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
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">Pita beban on-call</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-4xl font-semibold tracking-tight text-night">
          {paid ? record.result.protectLabel : "Pita masih terkunci"}
        </h1>
        {paid ? <BandPill band={record.result.band}>{record.result.bandLabel}</BandPill> : <BandPill band="kunci">Belum dibuka</BandPill>}
      </div>
      <p className="mt-4 text-sm leading-6 text-mist">
        {record.input.nightsOnCall} malam on-call, {record.input.birthsAfterMidnight} persalinan lewat tengah malam, tidur{" "}
        {record.input.sleepHours.toString().replace(".", ",")} jam. {BACKUP_LABEL[record.input.backup]}.
      </p>

      {paid ? (
        <div className="mt-8 space-y-6">
          <Panel className="p-6">
            <h2 className="text-xl font-semibold text-night">{record.result.headline}</h2>
            <p className="mt-3 text-sm leading-7 text-ink/90">{record.result.note}</p>
          </Panel>
          <Panel className="p-6">
            <h2 className="text-xl font-semibold text-night">Malam dalam 14 hari ke depan</h2>
            <ul className="mt-4 space-y-4">
              {record.result.marks.map((item) => (
                <li key={item.title} className="border-b border-line pb-4 last:border-0 last:pb-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">{item.label}</p>
                  <p className="mt-1 font-semibold text-night">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-mist">{item.detail}</p>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel className="p-6">
            <h2 className="text-xl font-semibold text-night">Naskah ke pasien</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink/90">{record.result.patientScript}</p>
          </Panel>
          <Panel className="p-6">
            <h2 className="text-xl font-semibold text-night">Naskah ke cadangan</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink/90">{record.result.backupScript}</p>
          </Panel>
          <ul className="space-y-2 text-xs leading-5 text-mist">
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
