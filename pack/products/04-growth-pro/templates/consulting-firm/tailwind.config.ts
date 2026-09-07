import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      boxShadow: { glow: '0 24px 48px rgba(79, 70, 229, 0.18)' },
    },
  },
  plugins: [],
};

export default config;
