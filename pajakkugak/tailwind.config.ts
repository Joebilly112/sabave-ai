import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ledger: "#f3efe4",
        pine: "#143d36",
        moss: "#3f6f62",
        stamp: "#9f2d2d",
        brass: "#a6843d",
        ink: "#1a1f1c",
        mute: "#5e675f",
        line: "#ddd4c2",
        paper: "#fffdf8",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        slip: "0 26px 50px -30px rgba(20, 61, 54, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
