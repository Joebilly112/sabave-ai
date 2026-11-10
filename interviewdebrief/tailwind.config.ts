import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1a1814",
        paper: "#f3ecdf",
        card: "#fffaf2",
        line: "#e2d6c3",
        amber: "#d4892a",
        moss: "#2c6456",
        rose: "#9d3b3b",
        mute: "#6f675c",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 24px 60px -32px rgba(26, 24, 20, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
