/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#121212",
        "secundary-bg": "#1E1E1E",
        "terciary-bg": "#212121",

        "primary-text": "#FFFFFF",
        "secundary-text": "#B3B3B3",

        accent: "#16665e",
        disable: "#3A3A3A",
        border: "#3E3E3E",
      },
    },
  },
  plugins: [],
};
