/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bn: {
          cream: '#F7F4EE',
          dark: '#121214',
          darker: '#0B0B0D',
          gold: '#C49A45',
          goldDark: '#9E7422',
          goldLight: '#E5C37A',
          borderLight: 'rgba(218, 209, 193, 0.75)',
          borderDark: 'rgba(255, 255, 255, 0.12)',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
      }
    },
  },
  plugins: [],
}
