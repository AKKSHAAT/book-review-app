/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-color': '#37306B',
        'accent': '#9E4784',
        'succ': '#D27685'
    },
    },
  },
  plugins: [],
}