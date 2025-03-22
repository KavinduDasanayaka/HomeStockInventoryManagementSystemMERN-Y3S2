/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

        fontFamily: {
          sans: ["Poppins", "sans-serif"],
          cursive: ["Pacifico", "Sriracha", "cursive"],
          cursive2: ["Sriracha", "cursive"],
  },
      keyframes: {
        beatingHeart: {
          '0%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.15)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.15)' },
          '60%': { transform: 'scale(1)' },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
  },
},
      animation: {
        beatingHeart: 'beatingHeart 1.2s infinite',
      },
    },
  },
  plugins: [],
}
