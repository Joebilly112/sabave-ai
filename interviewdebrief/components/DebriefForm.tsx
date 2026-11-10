"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FORMATS, GUTS, FORMAT_LABEL, GUT_LABEL } from "@/lib/debrief";
import { Button, Field, SelectInput, TextArea, TextInput } from "@/components/ui";

export function DebriefForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    const payload = {
      role: String(form.get("role") || ""),
      format: String(form.get("format") || ""),
      asked: String(form.get("asked") || ""),
      durationMinutes: Number(form.get("durationMinutes")),
      gut: String(form.get("gut") || ""),
    };

    try {
      const created = await fetch("/api/debrief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const createdBody = (await created.json()) as { id?: string; error?: string };
      if (!created.ok || !createdBody.id) {
        throw new Error(createdBody.error || "Debrief gagal disusun.");
      }

      const charge = await fetch("/api/midtrans/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: createdBody.id }),
      });
      const chargeBody = (await charge.json()) as { redirectUrl?: string; error?: string };
      if (charge.ok && chargeBody.redirectUrl) {
        window.location.href = chargeBody.redirectUrl;
        return;
      }
      router.push(`/hasil/${createdBody.id}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Ada gangguan. Coba sekali lagi.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="ink-ring rounded-[28px] bg-card p-5 shadow-card sm:p-8">
      <div className="grid gap-5">
        <Field label="Peran yang dilamar" hint="Contoh: Product Analyst, perawat ICU, guru kelas 4.">
          <TextInput name="role" required maxLength={80} placeholder="Nama peran" autoComplete="organization-title" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Format">
            <SelectInput name="format" required defaultValue="hr">
              {FORMATS.map((format) => (
                <option key={format} value={format}>
                  {FORMAT_LABEL[format] === "HR" ? "HR / rekrut" : FORMAT_LABEL[format] === "user" ? "User / calon atasan" : "Case / tes"}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Berapa lama berjalan" hint="Dalam menit.">
            <TextInput name="durationMinutes" type="number" required min={5} max={180} defaultValue={30} />
          </Field>
        </div>
        <Field
          label="Apa yang ditanyakan, dan bagaimana kamu menjawab?"
          hint="Tidak perlu transkrip. Cukup pertanyaan yang kamu ingat dan jawaban yang kamu beri."
        >
          <TextArea
            name="asked"
            required
            minLength={40}
            maxLength={2500}
            placeholder="HR tanya alasan pindah. Saya jawab panjang soal atasan. Ditanya konflik, saya cerita tanpa angka. Saya tidak sempat bertanya balik."
          />
        </Field>
        <Field label="Rasa di perut sekarang">
          <SelectInput name="gut" required defaultValue="kacau">
            {GUTS.map((gut) => (
              <option key={gut} value={gut}>
                {GUT_LABEL[gut]}
              </option>
            ))}
          </SelectInput>
        </Field>
      </div>
      {error ? <p className="mt-4 text-sm text-rose">{error}</p> : null}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyusun…" : "Kunci debrief · Rp19.900"}
        </Button>
        <p className="text-xs leading-relaxed text-mute">Sekali bayar. Hasilnya di tautan pribadi, bukan langganan.</p>
      </div>
    </form>
  );
}
