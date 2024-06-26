/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'xpoppins':["Poppins", "sans-serif"],
        'xmontserrat':["Montserrat", "sans-serif"],
        'xlato':["Lato", "sans-serif"]
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

