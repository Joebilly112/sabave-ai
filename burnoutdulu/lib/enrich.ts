import type { CekInput, CekResult } from "@/lib/types";

export async function enrichScript(input: CekInput, result: CekResult): Promise<CekResult> {
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
              "Kamu merapikan satu pesan singkat bahasa Indonesia dari freelancer ke satu klien. Tujuannya jeda atau mengakhiri kerjaan karena beban, bukan karena uang. Jangan mengancam, jangan menyebut tarif, rupiah, atau diagnosis medis, jangan mengaku dokter atau terapis. Balas hanya isi pesan.",
          },
          {
            role: "user",
            content: JSON.stringify({
              kind: result.scriptKind,
              hoursWeek: input.hoursWeek,
              activeClients: input.activeClients,
              draft: result.clientScript,
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
    if (!/(jeda|berhenti|selesai|menutup)/i.test(text)) return result;
    if (/rp\s?\d|diagnos|depresi|burnout klinis|dokter|terapis/i.test(text)) return result;
    return { ...result, clientScript: text };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
