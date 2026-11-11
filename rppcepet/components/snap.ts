"use client";

export function loadSnap(isProduction: boolean, clientKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("snap"));
  if (window.snap) return Promise.resolve();
  const src = isProduction
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-snap='rppcepet']");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("snap")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.dataset.snap = "rppcepet";
    script.setAttribute("data-client-key", clientKey);
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("snap"));
    document.body.appendChild(script);
  });
}

export async function openSnap(input: {
  token: string;
  clientKey: string;
  isProduction: boolean;
  onDone: () => void;
}): Promise<void> {
  await loadSnap(input.isProduction, input.clientKey);
  if (!window.snap) throw new Error("snap");
  window.snap.pay(input.token, {
    onSuccess: input.onDone,
    onPending: input.onDone,
    onError: input.onDone,
  });
}
