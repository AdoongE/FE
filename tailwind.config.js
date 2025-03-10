const defaultColor = require('./src/styles/defaultColor');
const defaultFont = require('./src/styles/defaultFont');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/styles/global.css'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard-Regular', 'sans-serif'],
      },
      colors: defaultColor,
      fontSize: defaultFont,
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
