import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eef5ff',
          100: '#d9e7ff',
          200: '#bcd3ff',
          300: '#8eb4ff',
          400: '#598aff',
          500: '#3264ff',
          600: '#1e43ef',
          700: '#1733db',
          800: '#192eb1',
          900: '#1b2d8b',
          950: '#121a51',
        },
        ink: {
          50:  '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae2',
          300: '#b0b9c8',
          400: '#8592a8',
          500: '#66748e',
          600: '#525e75',
          700: '#444d5f',
          800: '#3a4251',
          900: '#333945',
          950: '#21252d',
        },
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [typography],
};
