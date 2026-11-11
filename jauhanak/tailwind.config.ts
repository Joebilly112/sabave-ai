import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#241c33",
        night: "#1b1430",
        dusk: "#6d4d86",
        lamp: "#e39a3a",
        paper: "#fbf6ef",
        mist: "#f3e9f6",
        leaf: "#2f6a52",
        rose: "#9a3d55",
        mute: "#6d6278",
        line: "#eadff0",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 30px 60px -36px rgba(27, 20, 48, 0.55)",
        glow: "0 0 0 8px rgba(227, 154, 58, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
