import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a09',
        paper: '#f4f2ed',
        stone: '#8c887d',
        'stone-dark': '#57544c',
        line: '#2a2a27',
        'line-light': '#d9d5c9',
        sand: '#c99a5f',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-space)', 'monospace'],
      },
      fontSize: {
        'huge': ['clamp(3.5rem, 12vw, 11rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'giant': ['clamp(2.5rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.015em' }],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
