// const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1E293B',
        secondary: '#059669'
      },
      maxHeight: {
        '1/2': '50%',
        '3/4': "75%"
      },
      spacing: {
        '1/8': '12.5%',
        '2/5': '40%',
        '3/10': '30%',
        '1/5': '20%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
