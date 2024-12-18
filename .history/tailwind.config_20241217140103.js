module.exports = {
  // content: [
  //   "./index.html",
  //   "./src/**/*.{vue,js,ts,jsx,tsx}",
  // ],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [],
};
