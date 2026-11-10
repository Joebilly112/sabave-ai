import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1a1814",
        seal: "#16324a",
        stamp: "#b4332a",
        wax: "#b8893d",
        paper: "#f7f1e6",
        card: "#fffaf2",
        mist: "#efe6d6",
        mute: "#6d6458",
        line: "#e2d5c0",
        moss: "#2f5d4a",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 30px 50px -34px rgba(22, 50, 74, 0.55)",
        stamp: "0 10px 24px -16px rgba(180, 51, 42, 0.7)",
      },
    },
  },
  plugins: [],
};

export default config;
