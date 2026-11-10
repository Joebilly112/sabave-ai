import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#241812",
        dusk: "#2c211c",
        ember: "#e07a3d",
        clay: "#b94a32",
        rest: "#5f7d62",
        cream: "#f7f1e8",
        paper: "#fffaf4",
        mute: "#6d6258",
        line: "#e6d9cc",
        sage: "#e4efe4",
        amberwash: "#fff1e2",
        redwash: "#fde8e3",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        desk: "0 28px 50px -32px rgba(36, 24, 18, 0.55)",
        glow: "0 12px 24px -16px rgba(224, 122, 61, 0.9)",
      },
    },
  },
  plugins: [],
};

export default config;
