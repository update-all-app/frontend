// const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1E293B',
        secondary: '#059669'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
