import type { KasusInput, KasusResult } from "@/lib/types";

export async function enrichMessage(input: KasusInput, result: KasusResult): Promise<KasusResult> {
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
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content:
              "Kamu menulis satu pesan WhatsApp singkat dalam bahasa Indonesia yang sopan. Freelancer belum mulai produksi. Pesan wajib meminta DP sebelum kickoff, tidak mengancam, dan tidak mengaku sebagai nasihat hukum. Balas hanya isi pesan.",
          },
          {
            role: "user",
            content: JSON.stringify({
              dpPercent: input.dpPercent,
              hasContract: input.hasContract,
              revision: input.revision,
              payment: input.payment,
              band: result.band,
              draft: result.message,
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
    if (!text || text.length < 40 || text.length > 500 || !/DP/i.test(text)) return result;
    return { ...result, message: text };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
