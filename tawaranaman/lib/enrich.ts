import type { OfferInput, OfferResult } from "@/lib/types";

export async function enrichScript(input: OfferInput, result: OfferResult): Promise<OfferResult> {
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
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "Kamu merapikan satu pesan singkat bahasa Indonesia untuk menolak tawaran kerja ke luar negeri dengan sopan. Jangan mengancam, jangan menghina, jangan menuduh seseorang penipu atau pelaku perdagangan orang, jangan menyebut nomor telepon, rekening, atau rupiah. Pesan harus menahan dokumen asli dan uang, serta menyebut cek lewat jalur resmi. Balas hanya isi pesan.",
          },
          {
            role: "user",
            content: JSON.stringify({
              country: input.country,
              visa: input.visa,
              draft: result.refusalScript,
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
    if (!/(tidak lanjut|tidak berangkat|menolak|tahan)/i.test(text)) return result;
    if (/rekening|08\d{8,}|rp\s?\d|ancam|lapor polisi sekarang|penipu|calo bangsat/i.test(text)) return result;
    return { ...result, refusalScript: text };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
