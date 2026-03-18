/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'maximo-darker': '#0b0f19',
        'maximo-dark': '#12182b',
        'maximo-cyan': '#00f0ff',
        'maximo-purple': '#8a2be2',
        'maximo-pink': '#ff007f',
      },
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 240, 255, 0.5), 0 0 20px rgba(0, 240, 255, 0.3)',
        'neon-purple': '0 0 10px rgba(138, 43, 226, 0.5), 0 0 20px rgba(138, 43, 226, 0.3)',
        'neon-pink': '0 0 10px rgba(255, 0, 127, 0.5), 0 0 20px rgba(255, 0, 127, 0.3)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
