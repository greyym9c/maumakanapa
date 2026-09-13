/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF9F4',
        brand: {
          blue: '#3975EA',
          'blue-light': '#E8F0FF',
          peach: '#FFC5AD',
          'peach-light': '#FFE8DD',
          navy: '#183153',
        },
      },
      fontFamily: {
        fredoka: ['Fredoka', 'system-ui', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '24px',
        'card-lg': '28px',
        'card-sm': '18px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(24, 49, 83, 0.07)',
        'soft-lg': '0 16px 40px rgba(24, 49, 83, 0.1)',
        'card-hover': '0 20px 40px rgba(57, 117, 234, 0.15)',
        'pop': '0 6px 0 rgba(24, 49, 83, 0.15)',
        'pop-blue': '0 6px 0 #285ec4',
      },
    },
  },
  plugins: [],
}
