/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'custom': '1280px'
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}

