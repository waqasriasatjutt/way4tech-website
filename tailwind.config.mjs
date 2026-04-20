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
          50:  '#f7f3f6',
          100: '#efe5ed',
          200: '#dcc8d7',
          300: '#c1a1b8',
          400: '#a17b95',
          500: '#875A7B',
          600: '#714B67',
          700: '#5C3D54',
          800: '#482f42',
          900: '#362233',
          950: '#1f1320',
        },
        accent: {
          50:  '#e5f7f7',
          100: '#bfeceb',
          200: '#7fd9d7',
          300: '#33bfbc',
          400: '#00a09d',
          500: '#008785',
          600: '#006e6c',
          700: '#005654',
          800: '#003e3d',
          900: '#002827',
        },
        ink: {
          50:  '#f7f6f9',
          100: '#ecebf2',
          200: '#d5d3e2',
          300: '#b0acc8',
          400: '#8a85a8',
          500: '#66628e',
          600: '#524e75',
          700: '#433f5f',
          800: '#37334f',
          900: '#1a1230',
          950: '#110a20',
        },
      },
      maxWidth: {
        '8xl': '88rem',
      },
      backgroundImage: {
        'odoo-gradient': 'linear-gradient(135deg, #875A7B 0%, #5C3D54 100%)',
        'odoo-accent': 'linear-gradient(135deg, #00A09D 0%, #714B67 100%)',
      },
    },
  },
  plugins: [typography],
};
