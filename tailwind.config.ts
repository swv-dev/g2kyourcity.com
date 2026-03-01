import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1E3A5F',
          dark: '#152942',
          light: '#2a4d7a',
        },
        gold: {
          DEFAULT: '#FFD700',
          dark: '#E6C200',
          light: '#FFDF33',
        },
        g2kYellow: '#F7B32B',
        g2kNavy: '#1B365D',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
