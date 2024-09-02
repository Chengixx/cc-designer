/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "../packages/core/components/**/*.{vue,js,ts,jsx,tsx}",
    "../packages/core/container/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#efeaeb",
      },
      minWidth: {
        "650px": "650px",
      },
      minHeight: {
        "60px": "60px",
        colHeight: "42px",
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
