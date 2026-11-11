import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#12182a",
        lamp: "#e7a23a",
        linen: "#f4efe7",
        ink: "#1b2230",
        card: "#fffdf9",
        mist: "#6f7788",
        line: "#e5dccf",
        tide: "#1f6d68",
        clay: "#9a5414",
        rose: "#9d3d4c",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 28px 50px -32px rgba(18, 24, 42, 0.45)",
        lamp: "0 16px 30px -18px rgba(231, 162, 58, 0.7)",
      },
    },
  },
  plugins: [],
};

export default config;
