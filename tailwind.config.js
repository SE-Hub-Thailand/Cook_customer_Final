/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow-hard': '#FBB615',
        'green-hard': '#026D44',
      },
      backgroundColor: {
        'yellow-hard-bg': '#FBB615',
        'green-bg': '#AFEA3D',
        'grey-bg': '#EFEFEF',
        'red-hard-bg': '#CE0E2D',
        'green-hard-bg' :'#026D44',
      },
    },
  },
  plugins: [],
}

