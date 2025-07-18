/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FFF0F6",
        secondary: "#A36CD2",
        light:{
          100 :"#FF7CA8",
          200:"#FFB6C1"
        },
        placeholder: "#9CA3AF",
      }
    },
  },
  plugins: [],
}