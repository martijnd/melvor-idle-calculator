module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        dark: '#121212',
        'dark-light': '#272727',
        'dark-lighter': '#444',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
