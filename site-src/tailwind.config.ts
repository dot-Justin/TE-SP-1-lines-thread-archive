import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        te: {
          black:    '#111111',
          surface:  '#1c1c1a',
          surface2: '#242422',
          light:    '#e8e4df',
          orange:   '#e84b13',
          text:     '#f0ede8',
          muted:    '#888880',
          border:   '#2a2a28',
          green:    '#8ff0a4',
          dark:     '#1a1a18',
        },
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'sans-serif'],
        body:    ['"Space Grotesk"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        pulse2:  'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
        bounce2: 'bounce 2s infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
