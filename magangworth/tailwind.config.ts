import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pine: "#1e3a2f",
        cream: "#f6f1e7",
        sand: "#f3ecdf",
        clay: "#c45c26",
        amber: "#e0a15a",
        moss: "#3f6b4e",
        ember: "#a33b32",
        ink: "#1c2416",
        mute: "#5e6758",
        line: "#e4d8c4",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        desk: "0 30px 60px -36px rgba(30, 58, 47, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
