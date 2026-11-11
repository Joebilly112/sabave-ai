import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#141a2b",
        ink: "#1c2433",
        indigo: "#2a3558",
        bone: "#f7f3ec",
        paper: "#fffdf9",
        mist: "#e4dccf",
        mute: "#6e675e",
        coral: "#d4533a",
        amber: "#c7841e",
        sage: "#2f6d56",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 28px 60px -36px rgba(20, 26, 43, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
