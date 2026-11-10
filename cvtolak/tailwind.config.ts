import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#121a24",
        paper: "#e7eef0",
        card: "#f5f8f9",
        line: "#d3dee3",
        signal: "#d64545",
        tide: "#0f7c74",
        mute: "#5c6b73",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 28px 70px -36px rgba(18, 26, 36, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
