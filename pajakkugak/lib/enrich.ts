import type { CekInput, CekResult } from "@/lib/types";

export async function enrichNote(input: CekInput, result: CekResult): Promise<CekResult> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey || result.verdict === "belum") return result;

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
              "Kamu merapikan satu pesan singkat bahasa Indonesia dari freelancer ke klien. Tujuannya hanya meminta bukti potong pajak atau konfirmasi bahwa tidak ada potongan. Jangan mengancam, jangan menyebut tarif, jangan menyebut diri sebagai DJP atau konsultan, jangan menambah angka. Balas hanya isi pesan.",
          },
          {
            role: "user",
            content: JSON.stringify({
              withheld: input.withheld,
              hasNpwp: input.hasNpwp,
              draft: result.clientNote,
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
    if (!text || text.length < 40 || text.length > 450) return result;
    if (!/bukti potong/i.test(text)) return result;
    if (/\d|%/.test(text)) return result;
    return { ...result, clientNote: text };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
