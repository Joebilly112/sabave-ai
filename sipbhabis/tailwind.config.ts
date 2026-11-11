import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#24182a",
        night: "#2a1840",
        plum: "#5b2a6a",
        stamp: "#d63b4e",
        gold: "#e7b15a",
        mist: "#f6f1ea",
        paper: "#fffaf4",
        mute: "#6d6172",
        line: "#eadfce",
        tide: "#1f6f78",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 30px 60px -36px rgba(42, 24, 64, 0.55)",
        stamp: "0 14px 30px -18px rgba(214, 59, 78, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
