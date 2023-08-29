module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        "dark-light": "#272727",
        "dark-lighter": "#444",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
