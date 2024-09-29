/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./src/**/*.{ts,js}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#fa186b',
        'primary-content': '#ffffff',
        'secondary': '#020b16',
        'secondary-content': '#ffffff',
        'accent': '#fa186b',
        'accent-content': '#ffffff',
        'neutral': '#1b252f',
        'neutral-content': '#cccfd1',
        'base-100': '#1b252f',
        'base-200': '#161f28',
        'base-300': '#020b16',
        'base-content': '#cccfd1',
        'info': '#1C7CFF',
        'info-content': '#ffffff',
        'success': '#13D693',
        'success-content': '#001008',
        'warning': '#FFD845',
        'warning-content': '#161102',
        'error': '#be123c',
        'error-content': '#f8d5d6',
      },
      fontFamily: {
        'ff-clan': ['FF Clan Pro', 'sans-serif'],
        sans: ['FF Clan Pro', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        helpbaerai: {
          "primary": "#fa186b",
          "primary-content": "#ffffff",
          "secondary": "#020b16",
          "secondary-content": "#ffffff",
          "accent": "#fa186b",
          "accent-content": "#ffffff",
          "neutral": "#1b252f",
          "neutral-content": "#cccfd1",
          "base-100": "#1b252f",
          "base-200": "#161f28",
          "base-300": "#020b16",
          "base-content": "#cccfd1",
          "info": "#1C7CFF",
          "info-content": "#ffffff",
          "success": "#13D693",
          "success-content": "#001008",
          "warning": "#FFD845",
          "warning-content": "#161102",
          "error": "#be123c",
          "error-content": "#f8d5d6",
        },
      },
    ],
  },
}

