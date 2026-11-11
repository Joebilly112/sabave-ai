import type { CekInput, CekResult } from "@/lib/types";

export async function enrichNote(input: CekInput, result: CekResult): Promise<CekResult> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return result;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "Kamu merapikan satu catatan singkat bahasa Indonesia dari bidan ke petugas loket perizinan. Isinya minta ditunjukkan syarat yang masih kurang untuk praktik mandiri di alamat baru. Jangan menjamin izin terbit, jangan mengutip nomor pasal, jangan membahas gaji atau tarif layanan. Sebut bahwa catatan ini bukan keputusan dinas. Balas hanya isi catatan.",
          },
          {
            role: "user",
            content: JSON.stringify({
              years: input.years,
              workplace: input.workplace,
              band: result.band,
              draft: result.loketNote,
            }),
          },
        ],
      }),
    });
    if (!response.ok) return result;
    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = payload.choices?.[0]?.message?.content?.trim().replace(/^["“]|["”]$/g, "");
    if (!text || text.length < 80 || text.length > 700) return result;
    if (!/dinas|loket|syarat/i.test(text)) return result;
    if (/pasal|dijamin|pasti lolos|resmi terbit|rp\s?\d|gaji|tarif/i.test(text)) return result;
    return { ...result, loketNote: text };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
