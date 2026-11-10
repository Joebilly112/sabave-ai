"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Field, Panel } from "@/components/ui";
import { flagLabels, foundLabels, paymentLabels, revisionLabels } from "@/lib/labels";
import { FLAGS, FOUND, PAYMENTS, REVISIONS, type Flag, type FoundVia, type Payment, type Revision } from "@/lib/types";

export function KasusForm() {
  const router = useRouter();
  const [foundVia, setFoundVia] = useState<FoundVia>("dm-dingin");
  const [dpPercent, setDpPercent] = useState(0);
  const [hasContract, setHasContract] = useState(false);
  const [revision, setRevision] = useState<Revision>("tidak-dibahas");
  const [payment, setPayment] = useState<Payment>("di-akhir");
  const [flags, setFlags] = useState<Flag[]>(["tengah-malam"]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function toggleFlag(flag: Flag) {
    setFlags((current) => (current.includes(flag) ? current.filter((item) => item !== flag) : [...current, flag]));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/kasus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foundVia, dpPercent, hasContract, revision, payment, flags }),
      });
      const payload = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !payload.id) {
        setError(payload.error || "Brief tidak tersimpan.");
        setPending(false);
        return;
      }
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "kasus_submit", path: "/hasil" }),
      });
      router.push(`/hasil/${payload.id}`);
    } catch {
      setError("Jaringan bermasalah. Coba sekali lagi.");
      setPending(false);
    }
  }

  const selectClass =
    "w-full rounded-2xl border border-line bg-fog px-4 py-3 text-sm text-night outline-none ring-flare/40 focus:ring-2";

  return (
    <Panel className="p-5 sm:p-7">
      <form onSubmit={onSubmit} className="space-y-6">
        <Field label="Dari mana klien ini datang?">
          <select className={selectClass} value={foundVia} onChange={(event) => setFoundVia(event.target.value as FoundVia)}>
            {FOUND.map((item) => (
              <option key={item} value={item}>
                {foundLabels[item]}
              </option>
            ))}
          </select>
        </Field>

        <Field label={`DP yang ditawarkan: ${dpPercent}%`} hint="Geser ke 0 kalau uang muka belum disebut sama sekali.">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={dpPercent}
            onChange={(event) => setDpPercent(Number(event.target.value))}
            className="w-full accent-flare"
          />
        </Field>

        <fieldset>
          <legend className="text-sm font-semibold text-night">Sudah ada kontrak atau surat pesanan?</legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {[
              { value: true, label: "Sudah ada" },
              { value: false, label: "Belum ada" },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setHasContract(option.value)}
                className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                  hasContract === option.value ? "border-night bg-night text-fog" : "border-line bg-fog text-night"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <Field label="Bagaimana aturan revisinya?">
          <select className={selectClass} value={revision} onChange={(event) => setRevision(event.target.value as Revision)}>
            {REVISIONS.map((item) => (
              <option key={item} value={item}>
                {revisionLabels[item]}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Bagaimana janji bayarnya?">
          <select className={selectClass} value={payment} onChange={(event) => setPayment(event.target.value as Payment)}>
            {PAYMENTS.map((item) => (
              <option key={item} value={item}>
                {paymentLabels[item]}
              </option>
            ))}
          </select>
        </Field>

        <fieldset>
          <legend className="text-sm font-semibold text-night">Tanda yang sudah terasa</legend>
          <p className="mt-1 text-xs text-mute">Centang yang benar-benar terjadi. Kosongkan kalau belum ada.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {FLAGS.map((flag) => (
              <label key={flag} className="flex items-start gap-3 rounded-2xl border border-line bg-fog px-3 py-3 text-sm text-night">
                <input
                  type="checkbox"
                  className="mt-1 accent-flare"
                  checked={flags.includes(flag)}
                  onChange={() => toggleFlag(flag)}
                />
                {flagLabels[flag]}
              </label>
            ))}
          </div>
        </fieldset>

        {error ? <p className="text-sm text-flare">{error}</p> : null}
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Menghitung…" : "Simpan brief & lihat kunci hasil"}
        </Button>
      </form>
    </Panel>
  );
}
