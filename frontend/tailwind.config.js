/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-teal': '#00f2fe',
        'neon-violet': '#8a2be2',
      }
    },
  },
  plugins: [],
}
