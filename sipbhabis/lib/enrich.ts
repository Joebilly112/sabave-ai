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
              "Kamu merapikan satu pesan singkat bahasa Indonesia dari bidan ke HRD atau petugas loket. Isinya minta ditunjukkan daftar berkas perpanjangan STRB dan SIPB yang sedang berlaku. Jangan menjamin izin terbit, jangan mengutip nomor pasal, jangan membahas gaji atau tarif. Sebut bahwa pesan ini catatan persiapan, bukan surat resmi. Balas hanya isi pesan.",
          },
          {
            role: "user",
            content: JSON.stringify({
              daysLeft: result.daysLeft,
              workplace: input.workplace,
              sipbCount: input.sipbCount,
              skp: input.skp,
              draft: result.pesan,
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
    if (!text || text.length < 80 || text.length > 800) return result;
    if (!/STRB|SIPB|berkas/i.test(text)) return result;
    if (/pasal|dijamin|pasti terbit|resmi diperpanjang|gaji|tarif|rp\s?\d/i.test(text)) return result;
    return { ...result, pesan: text };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
