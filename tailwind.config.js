// const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1E293B',
        secondary: '#065F46'
      },
      maxHeight: {
        '1/2': '50%',
        '3/4': "75%"
      },
      minHeight: {
        '1/2': '50%'
      },
      height: {
        '22': '5.5em'
      },
      width: {
        '160': '40rem'
      },
      spacing: {
        '1/8': '12.5%',
        '2/5': '40%',
        '3/10': '30%',
        '1/5': '20%',
        '1/2': '50%',
        '45pc': '45%',
        '45vh': '45vh',
        '7/8': '87.5%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
