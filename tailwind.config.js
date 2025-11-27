/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",   
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pastelPink: "#FBC4C4",
        pastelBlue: "#B3D8F2",
        pastelGreen: "#CFF1D6",
        pastelPurple: "#E1D5F5",
        pastelYellow: "#FAF3C0",
      },
    },
  },
  plugins: [],
};
