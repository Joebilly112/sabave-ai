import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        soot: "#1c1915",
        ink: "#2a2118",
        dawn: "#e39a3c",
        ember: "#b85a22",
        rail: "#314056",
        ticket: "#f6f0e4",
        paper: "#fbf7f0",
        mist: "#e7dcc8",
        moss: "#2f6a4a",
        clay: "#a33b24",
        mute: "#6d645b",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 26px 50px -34px rgba(28, 25, 21, 0.55)",
        stub: "0 1px 0 rgba(255,255,255,0.7) inset, 0 18px 40px -28px rgba(49, 64, 86, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
