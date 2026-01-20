
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4285F4', // Google Blue
          hover: '#3367D6',   // Darker Google Blue
          light: '#E8F0FE',   // Light Google Blue
        },
        secondary: {
          DEFAULT: '#34A853', // Google Green
          hover: '#2E7D32',
          light: '#E6F4EA',
        },
        googleRed: '#EA4335',
        googleYellow: '#FBBC04',
      }
    },
  },
  plugins: [],
}
