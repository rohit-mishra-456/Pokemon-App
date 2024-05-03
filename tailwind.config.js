/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gradientColorStops:{
        'custom-gradient': 'linear-gradient(30deg, #ff0000, #ffff00, #00ff00, #ff69b4, #0000ff)',
      },
      screens:{
        "xs": "0px"
      }
    },
  },
  plugins: [],
}