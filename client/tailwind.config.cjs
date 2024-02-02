/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(255,255,255)",
        secondary: "rgb(248,248,250)",
        tertiary: "#416442",
      },
    },
  },
  plugins: [],
};
