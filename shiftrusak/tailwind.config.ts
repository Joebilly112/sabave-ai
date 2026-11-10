import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101820",
        ward: "#152433",
        lamp: "#f2c14e",
        pulse: "#e15b64",
        tide: "#7ec8c3",
        mist: "#e7eef5",
        paper: "#f7fafc",
        mute: "#5c6b78",
        line: "#d5e0ea",
        night: "#24384c",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        ward: "0 28px 50px -32px rgba(16, 24, 32, 0.65)",
        lamp: "0 12px 28px -16px rgba(242, 193, 78, 0.85)",
      },
    },
  },
  plugins: [],
};

export default config;
