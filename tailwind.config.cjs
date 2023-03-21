/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      margin: {
        center: '0 auto'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
