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
              "Kamu merapikan satu pesan singkat bahasa Indonesia dari perawat ke kepala ruangan. Isinya minta penyesuaian roster supaya dinas pagi tidak menempel malam. Jangan membahas gaji, rupiah, atau cuti panjang. Jangan mengaku dokter, jangan memberi diagnosis, jangan menyebut penyakit. Balas hanya isi pesan.",
          },
          {
            role: "user",
            content: JSON.stringify({
              nights: input.shifts.filter((shift) => shift === "malam").length,
              sleepHours: input.sleepHours,
              commuteMinutes: input.commuteMinutes,
              draft: result.script,
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
    if (!text || text.length < 120 || text.length > 900) return result;
    if (!/kepala ruangan/i.test(text) || !/roster|dinas/i.test(text)) return result;
    if (/rp\s?\d|gaji|diagnos|depresi|insomnia klinis|dokter/i.test(text)) return result;
    return { ...result, script: text };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
