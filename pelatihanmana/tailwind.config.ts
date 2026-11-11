import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14182b",
        panel: "#1c2238",
        line: "#313852",
        mist: "#c9d0c2",
        paper: "#f4f6ef",
        lime: "#d6f25c",
        coral: "#ff6b4a",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 24px 60px rgba(8, 10, 20, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
