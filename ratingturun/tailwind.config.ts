import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14120e",
        asphalt: "#1c1915",
        star: "#f0b429",
        ember: "#e85d4c",
        moss: "#2f7d5b",
        sand: "#f6f1e7",
        paper: "#fffdf8",
        mute: "#6d6458",
        line: "#e6dccb",
        road: "#2a2622",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        road: "0 30px 60px -36px rgba(20, 18, 14, 0.7)",
        star: "0 14px 30px -18px rgba(240, 180, 41, 0.9)",
      },
    },
  },
  plugins: [],
};

export default config;
