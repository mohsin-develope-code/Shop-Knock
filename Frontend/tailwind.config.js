/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      animation: {
        'slide-down': 'slideDown 0.2s ease-in-out', // Fast slide in 200ms
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },


      colors: {
        'main-yellow': 'rgb(255, 187, 56)',
        'skin' : '#ffbf6d'
      },
    },
  },
  plugins: [],
}

