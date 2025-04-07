/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e4f2ff',
          100: '#c2e0ff',
          200: '#9ccaff',
          300: '#77b4ff',
          400: '#569eff',
          500: '#2563eb', // Primary brand color
          600: '#1a56db',
          700: '#1049b7',
          800: '#103d91',
          900: '#0f2e6a',
        },
        secondary: {
          500: '#10b981', // Secondary color for accents
        },
        dark: {
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}