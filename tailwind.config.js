//为了获取tailwindcss代码提示
/** @type {import('tailwindcss').Config} */
export default {
  // tailwind和vuetify会有冲突 所以需要设置prefix
  prefix: "c-",
  darkMode: ["class", '[class~="dark"]'],
  content: [
    "./packages/core/src/**/*.{vue,js,ts,jsx,tsx}",
    "./packages/materials/core/**/*.{vue,js,ts,jsx,tsx}",
    "./packages/extensions/src/**/*.{vue,js,ts,jsx,tsx}",
    "./packages/designer/src/**/*.{vue,js,ts,jsx,tsx}",
    "./packages/engine/src/**/*.{vue,js,ts,jsx,tsx}",
    "./packages/renderer/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        commonShadow: "0 6px 16px 0 rgba(0,0,0,.15)",
        commonShadowDark: "0 6px 16px 0 rgba(255,255,255,.15)",
      },
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
