import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#122033",
        seal: "#0f6e6a",
        stamp: "#c2410c",
        gold: "#9a7209",
        paper: "#e7efec",
        card: "#f5faf8",
        line: "#c9dbd6",
        mist: "#4c5c66",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        folder: "0 24px 60px rgba(18, 32, 51, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
