/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.scss",
  ],
  theme: {
    extend: {
      colors: {
          primary: "#6576FF",
          secondary: "#FFBB5A",
          body: "#fff",
          border: "#DBDFEA",
          text: "#8091A7",
          dark: "#364A63",
      },
    },
  },
  plugins: [],
};
