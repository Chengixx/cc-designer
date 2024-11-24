//为了获取tailwindcss代码提示
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./packages/core/src/**/*.{vue,js,ts,jsx,tsx}",
    "./packages/ui/template/**/*.{vue,js,ts,jsx,tsx}",
    "./packages/ui/base/**/*.{vue,js,ts,jsx,tsx}",
    "./packages/extensions/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        darkMode: "#141414",
      },
      borderColor: {
        darkMode: "#3c3c3e",
      },
      height: {
        "95%": "95%",
        "180%": "180%",
      },
      borderRadius: {
        "b-50%": "0 0 50% 50%",
        "t-50%": "50% 50% 0 0",
      },
    },
  },
  plugins: [],
};
