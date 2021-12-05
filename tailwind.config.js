const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Noto Sans'"],
        display: ["Mulish"],
      },
      colors: {
        blue: colors.sky,
      },
    },
  },
  variants: {},
  plugins: [],
};
