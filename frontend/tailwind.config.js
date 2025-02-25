/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors : {
        primary: "#f42c37",
        secondary: "#f42c37",
        brandYellow:"fdc62e",
        brandGreen:"2dcc6f",
        brandBlue:"1376f4",
        brandWhite:"#eeeeee",
      },
      container:{
        center : true,
        padding:{
          DEFAULT : "30px",
          sm: "3rem",
        }
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes : [
      {
        mytheme : {
          "primary" : "#f42c37",
          "secondary" : "#42b72a",
          "accent" : "#37cdbe",
          "neutral" : "#3d4451",
          "base-100" : "#ffffff"
        }
      }
    ]
  }
}