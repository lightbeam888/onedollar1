/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        xs: "290px",
      },
      fontFamily: {
        b612: ['"B612 Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
