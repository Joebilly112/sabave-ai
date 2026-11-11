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
              "Kamu merapikan satu paragraf bahasa Indonesia untuk bidan yang meninjau beban on-call malam. Jangan mendiagnosis, jangan menyarankan obat, jangan menyebut gaji, jangan menjanjikan aman secara klinis, jangan menyuruh menolak persalinan yang sudah berjalan. Balas hanya paragraf itu.",
          },
          {
            role: "user",
            content: JSON.stringify({
              nightsOnCall: input.nightsOnCall,
              birthsAfterMidnight: input.birthsAfterMidnight,
              sleepHours: input.sleepHours,
              backup: input.backup,
              band: result.band,
              protectNights: result.protectNights,
              draft: result.note,
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
    if (/gaji|diagnos|obat|depresi|dijamin aman|tolak pasien|jangan tolong/i.test(text)) return result;
    return { ...result, note: text };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
