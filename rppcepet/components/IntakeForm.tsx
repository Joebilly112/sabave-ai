"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, fieldClass } from "@/components/ui";
import { openSnap } from "@/components/snap";
import { PRODUCT } from "@/lib/config";
import { JENJANG, KURIKULUM } from "@/lib/types";

type TokenResponse = {
  id?: string;
  token?: string | null;
  clientKey?: string;
  isProduction?: boolean;
  error?: string;
};

export function IntakeForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      jenjang: String(form.get("jenjang") ?? ""),
      mapel: String(form.get("mapel") ?? ""),
      kurikulum: String(form.get("kurikulum") ?? ""),
      topik: String(form.get("topik") ?? ""),
      jumlahSiswa: Number(form.get("jumlahSiswa")),
      menitTersedia: Number(form.get("menitTersedia")),
    };

    try {
      const response = await fetch("/api/midtrans/token", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as TokenResponse;
      if (!response.ok || !data.token || !data.clientKey || !data.id) {
        if (data.id) router.push(`/hasil/${data.id}`);
        setError(data.error || "Kerangka belum bisa dibuat.");
        setBusy(false);
        return;
      }
      await openSnap({
        token: data.token,
        clientKey: data.clientKey,
        isProduction: Boolean(data.isProduction),
        onDone: () => router.push(`/hasil/${data.id}`),
      });
      setBusy(false);
    } catch {
      setError("Pembayaran belum terbuka. Coba lagi sebentar.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-[28px] border border-line bg-sheet p-5 shadow-sheet sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Jenjang">
          <select name="jenjang" required className={fieldClass} defaultValue="SMP">
            {JENJANG.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
        <Field label="Kurikulum">
          <select name="kurikulum" required className={fieldClass} defaultValue="Merdeka">
            {KURIKULUM.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Mata pelajaran" hint="Tulis seperti di jadwal, misalnya Matematika atau Bahasa Indonesia.">
        <input name="mapel" required minLength={2} maxLength={80} className={fieldClass} placeholder="Bahasa Indonesia" />
      </Field>
      <Field label="Topik besok" hint="Sempitkan sampai cukup untuk satu pertemuan.">
        <input name="topik" required minLength={2} maxLength={140} className={fieldClass} placeholder="Teks prosedur membuat minuman" />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Jumlah siswa" hint="1 sampai 60.">
          <input name="jumlahSiswa" required type="number" min={1} max={60} defaultValue={32} className={fieldClass} />
        </Field>
        <Field label="Menit yang tersisa malam ini" hint="15 sampai 180. Checklist mengikuti angka ini.">
          <input name="menitTersedia" required type="number" min={15} max={180} defaultValue={30} className={fieldClass} />
        </Field>
      </div>
      {error ? <p className="text-sm font-medium text-clay">{error}</p> : null}
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={busy}>
          {busy ? "Menyiapkan…" : `Buka pembayaran · ${PRODUCT.priceLabel}`}
        </Button>
        <p className="max-w-sm text-xs leading-relaxed text-mist">
          Sekali bayar lewat QRIS atau e-wallet. Kamu menulis sendiri di kelas; ini hanya kerangka, checklist, dan lampu merah.
        </p>
      </div>
    </form>
  );
}
