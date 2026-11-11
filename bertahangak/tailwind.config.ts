import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16302c",
        sea: "#0e3b38",
        tide: "#1d6b62",
        foam: "#e7f3f0",
        sand: "#f6f1e6",
        lantern: "#d86a32",
        clay: "#8c3b24",
        leaf: "#1f7a4d",
        mute: "#5e6e6a",
        line: "#e3ddd0",
        paper: "#f7f4ee",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 28px 50px -32px rgba(14, 59, 56, 0.45)",
        glow: "0 0 0 8px rgba(216, 106, 50, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
