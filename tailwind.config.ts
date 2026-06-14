import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0b0b09',
        parchment: '#f5f0e7',
        bone: '#fbf8f1',
        gold: '#c99536',
        ember: '#8b5d1d',
      },
      fontFamily: {
        display: ['Bodoni 72', 'Didot', 'Iowan Old Style', 'Georgia', 'ui-serif', 'serif'],
        serif: ['Iowan Old Style', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 90px rgb(11 11 9 / 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config
