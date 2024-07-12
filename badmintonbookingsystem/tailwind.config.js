/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      fontFamily: {
        rubikmonoone: ['"Rubik Mono One"', 'monospace'],
        poppins: ['Poppins', 'sans-serif'],
        alfa: ['Alfa Slab One', 'serif'],
      },
      backgroundImage: {
        'banner': "url('/assets/images/banner.png')",
        'footer': "url('/assets/images/footer.png')"
      },
    },
  },
  plugins: [],
}

