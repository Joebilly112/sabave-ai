/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1B2740",
        paper: "#F3EFE4",
        manila: "#E7D7B8",
        stamp: "#B42318",
        pine: "#1F6B4A",
        brass: "#8C6A2F",
      },
    },
  },
  plugins: [],
};
