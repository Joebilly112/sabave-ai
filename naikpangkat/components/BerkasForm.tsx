"use client";

import { useMemo, useState } from "react";
import { JABATAN_OPTIONS, PNS_RANKS, PPPK_GRADES, buildUnlock, validateInput, type StatusAsn } from "@/lib/berkas";
import { SITE } from "@/lib/site";
import { BerkasReport } from "./BerkasReport";
import { Button, Field, SelectField } from "./ui";

type SnapResult = {
  snapToken: string;
  redirectUrl: string;
  clientKey: string;
  snapScript: string;
  id: string;
};

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options: {
          onSuccess?: () => void;
          onPending?: () => void;
          onError?: () => void;
          onClose?: () => void;
        },
      ) => void;
    };
  }
}

function loadSnap(src: string, clientKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-midtrans-snap]");
    if (existing && window.snap) {
      resolve();
      return;
    }
    existing?.remove();
    const script = document.createElement("script");
    script.src = src;
    script.dataset.midtransSnap = "true";
    script.dataset.clientKey = clientKey;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Skrip pembayaran gagal dimuat."));
    document.body.appendChild(script);
  });
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1970 + 1 }, (_, index) => currentYear - index);

export function BerkasForm() {
  const [status, setStatus] = useState<StatusAsn>("pns");
  const [golongan, setGolongan] = useState("III/a");
  const [yearsInGrade, setYearsInGrade] = useState("4");
  const [jabatan, setJabatan] = useState("pelaksana");
  const [lastSkYear, setLastSkYear] = useState(String(currentYear - 4));
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const grades: readonly string[] = status === "pns" ? PNS_RANKS.map((rank) => rank.code) : PPPK_GRADES;
  const selectedGrade = grades.includes(golongan) ? golongan : grades[0];

  const preview = useMemo(() => {
    const parsed = validateInput({
      status,
      golongan: selectedGrade,
      yearsInGrade,
      jabatan,
      lastSkYear,
    });
    if (!parsed.ok) return null;
    return buildUnlock(parsed.value, new Date());
  }, [status, selectedGrade, yearsInGrade, jabatan, lastSkYear]);

  function onStatus(next: StatusAsn) {
    setStatus(next);
    setGolongan(next === "pns" ? "III/a" : "I");
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const parsed = validateInput({
      status,
      golongan: selectedGrade,
      yearsInGrade,
      jabatan,
      lastSkYear,
    });
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.value),
      });
      const payload = (await response.json()) as SnapResult & { error?: string };
      if (!response.ok || !payload.snapToken) {
        throw new Error(payload.error || "Pembayaran belum bisa dibuat.");
      }
      await loadSnap(payload.snapScript, payload.clientKey);
      if (!window.snap) throw new Error("Pembayaran belum siap.");
      window.snap.pay(payload.snapToken, {
        onSuccess: () => {
          window.location.href = `/hasil/${payload.id}`;
        },
        onPending: () => {
          window.location.href = `/hasil/${payload.id}`;
        },
        onError: () => setError("Pembayaran gagal. Anda bisa mencoba lagi."),
        onClose: () => setPending(false),
      });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Terjadi kendala.");
      setPending(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={onSubmit} className="rounded-[28px] border border-ink/10 bg-white p-5 sm:p-6">
        <h2 className="text-2xl font-extrabold tracking-tight">Data di SK, bukan di grup</h2>
        <p className="mt-2 text-sm leading-6 text-ink/65">
          Tidak perlu NIP atau nama. Lima hal ini cukup untuk menyusun daftar.
        </p>
        <div className="mt-5 space-y-4">
          <Field label="Status kepegawaian">
            <div className="grid grid-cols-2 gap-2">
              {(["pns", "pppk"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onStatus(option)}
                  className={`rounded-2xl px-3 py-3 text-sm font-semibold ${
                    status === option ? "bg-ink text-paper" : "bg-paper text-ink ring-1 ring-ink/10"
                  }`}
                >
                  {option === "pns" ? "PNS" : "PPPK"}
                </button>
              ))}
            </div>
          </Field>
          <Field label={status === "pns" ? "Golongan sekarang" : "Golongan PPPK sekarang"}>
            <SelectField value={selectedGrade} onChange={(event) => setGolongan(event.target.value)}>
              {status === "pns"
                ? PNS_RANKS.map((rank) => (
                    <option key={rank.code} value={rank.code}>
                      {rank.code} · {rank.name}
                    </option>
                  ))
                : PPPK_GRADES.map((grade) => (
                    <option key={grade} value={grade}>
                      Golongan {grade}
                    </option>
                  ))}
            </SelectField>
          </Field>
          <Field label="Lama di golongan ini" hint="Hitung dari TMT pangkat terakhir, bukan dari tahun CPNS.">
            <SelectField value={yearsInGrade} onChange={(event) => setYearsInGrade(event.target.value)}>
              {Array.from({ length: 46 }, (_, year) => (
                <option key={year} value={year}>
                  {year} tahun
                </option>
              ))}
            </SelectField>
          </Field>
          <Field label="Jenis jabatan">
            <SelectField value={jabatan} onChange={(event) => setJabatan(event.target.value)}>
              {JABATAN_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectField>
          </Field>
          <Field label="Tahun SK terakhir" hint={status === "pppk" ? "Tahun SK pengangkatan atau perubahan terakhir." : "Tahun SK pangkat yang sekarang Anda pegang."}>
            <SelectField value={lastSkYear} onChange={(event) => setLastSkYear(event.target.value)}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </SelectField>
          </Field>
        </div>
        {error ? <p className="mt-4 text-sm font-medium text-stamp">{error}</p> : null}
        <Button type="submit" className="mt-5 w-full" disabled={pending}>
          {pending ? "Menyiapkan pembayaran…" : `Buka daftar lengkap · ${SITE.priceLabel}`}
        </Button>
        <p className="mt-3 text-xs leading-5 text-ink/50">
          QRIS, GoPay, atau ShopeePay. Hasilnya informasi untuk menyusun map, bukan keputusan kepegawaian.
        </p>
      </form>
      <div>{preview ? <BerkasReport unlock={preview} locked /> : null}</div>
    </div>
  );
}
