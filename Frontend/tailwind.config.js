/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      boxShadow: {
        'all': 'rgba(0, 0, 0, 0.3) 10px 10px rgba(0, 0, 0, 0.3)', // Equal shadow in all directions
      },
      
      animation: {
        'slide-up': 'slideUp 0.2s ease-in-out', // Fast slide in 200ms
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
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

