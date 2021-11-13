module.exports = {
  mode: "jit",
  purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Noto Sans'"],
        display: ["Mulish"],
      },
    },
  },
  variants: {},
  plugins: [],
};
