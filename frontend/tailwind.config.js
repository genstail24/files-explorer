/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Segoe UI', 'Helvetica', 'Arial', 'sans-serif'], // Font Windows
      },
      colors: {
        'windows-gray': '#f1f1f1', // Warna abu-abu untuk latar belakang seperti Windows
        'windows-blue': '#0078d4', // Biru Windows
        'windows-dark': '#333333', // Warna gelap untuk mode dark
      },
    },
  },
  plugins: [],
}

