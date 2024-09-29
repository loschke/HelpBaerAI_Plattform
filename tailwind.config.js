/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./src/**/*.{ts,js}"
  ],
  theme: {
    extend: {
      colors: {
        'base-100': '#1b252f',
        'base-content': '#cccfd1',
        'primary': '#fa186b',
        'primary-content': '#ffffff',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
}

