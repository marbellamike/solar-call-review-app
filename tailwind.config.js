/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        solar: {
          50: '#fef8f0',
          100: '#fef1e1',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309'
        }
      }
    }
  },
  plugins: []
}
