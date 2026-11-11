"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CERTS, GOALS, UNITS, YEARS } from "@/lib/types";
import type { CertId } from "@/lib/types";
import { Button, Field, Panel, Select, TextInput } from "@/components/ui";

declare global {
  interface Window {
    snap?: {
      pay: (token: string, options: Record<string, unknown>) => void;
    };
  }
}

function loadSnap(): Promise<void> {
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
  if (!clientKey) return Promise.resolve();
  if (window.snap) return Promise.resolve();
  const prod = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true";
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = prod ? "https://app.midtrans.com/snap/snap.js" : "https://app.sandbox.midtrans.com/snap/snap.js";
    script.dataset.clientKey = clientKey;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Snap gagal dimuat"));
    document.body.appendChild(script);
  });
}

export function IntakeForm() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [unit, setUnit] = useState("");
  const [years, setYears] = useState("");
  const [goal, setGoal] = useState("");
  const [held, setHeld] = useState<CertId[]>([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function toggle(id: CertId) {
    setHeld((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!unit || !years || !goal) {
      setError("Lengkapi unit, lama kerja, dan tujuan karier.");
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/midtrans/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, unit, years, goal, held }),
      });
      const data = (await response.json()) as { id?: string; token?: string; error?: string };
      if (!response.ok || !data.id) {
        setError(data.error || "Pembayaran belum bisa dibuat.");
        setPending(false);
        return;
      }
      if (!data.token || !process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY) {
        router.push(`/hasil/${data.id}`);
        return;
      }
      await loadSnap();
      if (!window.snap) {
        router.push(`/hasil/${data.id}`);
        return;
      }
      window.snap.pay(data.token, {
        onSuccess: () => router.push(`/hasil/${data.id}`),
        onPending: () => router.push(`/hasil/${data.id}`),
        onError: () => {
          setError("Pembayaran gagal. Kamu bisa coba lagi.");
          setPending(false);
        },
        onClose: () => {
          router.push(`/hasil/${data.id}`);
        },
      });
    } catch {
      setError("Jaringan bermasalah. Coba sekali lagi.");
      setPending(false);
    }
  }

  return (
    <Panel className="p-5 sm:p-7">
      <form onSubmit={onSubmit} className="space-y-5">
        <Field label="Nama panggilan" hint="Opsional. Hanya tampil di halaman hasilmu.">
          <TextInput
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            maxLength={40}
            placeholder="Misalnya Rani"
            autoComplete="nickname"
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Unit sekarang">
            <Select value={unit} onChange={(event) => setUnit(event.target.value)} required>
              <option value="">Pilih unit</option>
              {UNITS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Lama kerja sebagai perawat">
            <Select value={years} onChange={(event) => setYears(event.target.value)} required>
              <option value="">Pilih masa kerja</option>
              {YEARS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Tujuan karier 12 bulan ke depan">
          <Select value={goal} onChange={(event) => setGoal(event.target.value)} required>
            <option value="">Pilih tujuan</option>
            {GOALS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </Select>
        </Field>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-paper">Sertifikat yang sudah kamu pegang</legend>
          <p className="mb-3 text-xs text-mist/80">Kosongkan kalau belum ada. Yang sudah dimiliki tidak akan dianjurkan lagi.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {CERTS.map((item) => (
              <label key={item.id} className="flex items-start gap-2 rounded-2xl border border-line bg-ink px-3 py-2 text-sm text-paper">
                <input
                  type="checkbox"
                  className="mt-1 accent-lime"
                  checked={held.includes(item.id)}
                  onChange={() => toggle(item.id)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {error ? <p className="text-sm text-coral">{error}</p> : null}
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Menyiapkan pembayaran…" : "Buka 3 pelatihan berikutnya · Rp19.900"}
        </Button>
        <p className="text-xs leading-relaxed text-mist/80">
          Sekali bayar lewat QRIS atau e-wallet. Kamu mendapat urutan tiga pelatihan, alasan, biaya waktu, dan yang ditunda. Bukan janji mutasi.
        </p>
      </form>
    </Panel>
  );
}
