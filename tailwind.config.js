// const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'max-height': 'max-height'
      },
      colors: {
        primary: '#111827',
        secondary: '#ffffff', //'#065F46'
        tertiary: '#4338CA',
        terdark: '#3730A3',
        secdark: '#E0E7FF',
        yellow: '#dddb52'
      },
      maxHeight: {
        '1/2': '50%',
        '3/4': '75%'
      },
      minHeight: {
        '1/2': '50%'
      },
      height: {
        22: '5.5em',
        100: '25rem',
        160: '40rem',
        120: '30rem',
        header: '65px',
        'top-sidebar': '200px',
        footer: '55px',
        main: "calc(100vh - theme('height.header'))",
        content:
          "calc(100vh - theme('height.header') - theme('height.footer'))",
        'content-narrow':
          "calc(100vh - theme('height.header') - theme('height.top-sidebar') - theme('height.footer'))"
      },
      width: {
        160: '40rem',
        100: '25rem',
        120: '30rem',
        200: '50rem'
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
      },
      zIndex: {
        '-10': '-10',
        200: '200'
      }
    }
  },
  variants: {
    border: ['responsive', 'hover', 'focus', 'group-hover'],
    extend: { margin: ['first', 'last'] },
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: []
};
