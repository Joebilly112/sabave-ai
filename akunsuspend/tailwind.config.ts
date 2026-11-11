import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#101614",
        asphalt: "#1b2621",
        hazard: "#f2c014",
        flare: "#ff5a3c",
        ok: "#1f8f62",
        foam: "#eef3ef",
        paper: "#f7faf7",
        ink: "#12201a",
        mist: "#5e7268",
        line: "#d5e0d8",
        pine: "#24352d",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        phone: "0 30px 60px -28px rgba(16, 22, 20, 0.65)",
        glow: "0 14px 30px -18px rgba(242, 192, 20, 0.9)",
      },
    },
  },
  plugins: [],
};

export default config;
