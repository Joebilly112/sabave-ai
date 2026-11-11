import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1b2b24",
        grove: "#14382c",
        leaf: "#1f7a4d",
        sprout: "#d7f3e3",
        clay: "#c45c32",
        sand: "#f3eee4",
        paper: "#fffdf8",
        mute: "#5e6b63",
        line: "#e4d9c8",
        moss: "#2f6f55",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        desk: "0 28px 50px -32px rgba(20, 56, 44, 0.55)",
        lamp: "0 12px 28px -16px rgba(196, 92, 50, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
