/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "white",
        secondary: "rgb(248,248,250)",
        accent: "#416442",
      },
    },
  },
  plugins: [],
};
