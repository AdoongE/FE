const defaultColor = require('./src/styles/default-color');
const defaultFontSize = require('./src/styles/default-font-size');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/styles/global.css'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard-Regular', 'sans-serif'],
      },
      colors: defaultColor,
      fontSize: defaultFontSize,
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
