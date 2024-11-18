/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        cs: "linear-gradient(90deg, #def4a2 30%, #88e5c8 70%)",
      },
      width: {
        xs: "290px",
      },
      fontFamily: {
        b612: ['"B612 Mono"', "monospace"],
      },
      colors: {
        box: "#ECE9E6",
      },
    },
  },
  plugins: [],
};
