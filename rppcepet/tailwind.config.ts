import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1c1915",
        pine: "#1d5c4a",
        lamp: "#e39a2d",
        clay: "#c4532a",
        paper: "#f6f1e6",
        sheet: "#fffaf2",
        line: "#e4d5bf",
        mist: "#5c5348",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sheet: "0 22px 50px rgba(70, 42, 12, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
