"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

export function ReloadButton() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => {
        setSpinning(true);
        router.refresh();
        setTimeout(() => setSpinning(false), 600);
      }}
    >
      {spinning ? "Memuat…" : "Saya sudah bayar — muat ulang"}
    </Button>
  );
}
