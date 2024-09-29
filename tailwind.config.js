/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./src/**/*.{ts,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

