/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ← Ativa o modo escuro via classe
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
