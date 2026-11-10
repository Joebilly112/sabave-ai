import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#17141f",
        fog: "#f4efe6",
        mist: "#e6dfd2",
        paper: "#fffaf3",
        flare: "#d4532b",
        tide: "#1d6b63",
        ink: "#1c1917",
        mute: "#6d655c",
        line: "#ddd4c6",
        ghost: "#8b8494",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        slip: "0 28px 50px -32px rgba(23, 20, 31, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
