/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins"],
    },
    extend: {
      colors: {
        primary: '#064F3B',
      },
      screens: {
        'xl': '1024px', 
      },
    },
  },
  plugins: [],
}
