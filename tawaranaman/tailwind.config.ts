import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#142033",
        sea: "#0e6b66",
        deep: "#0c2c3a",
        foam: "#e7f4f2",
        sand: "#f6f1e7",
        paper: "#fffdf8",
        coral: "#c4483a",
        gold: "#9a6b24",
        mute: "#5c6b78",
        line: "#d5e4e1",
        wash: "#f3e4d4",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 28px 50px -34px rgba(12, 44, 58, 0.55)",
        stamp: "0 12px 24px -16px rgba(14, 107, 102, 0.85)",
      },
    },
  },
  plugins: [],
};

export default config;
