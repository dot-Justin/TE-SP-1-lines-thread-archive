import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        te: {
          black:    '#131210',  // warm near-black (from SVG #242423 shifted darker)
          surface:  '#1e1b18',  // warm dark surface
          surface2: '#272320',  // warm milestone card bg
          light:    '#ece5d8',  // warm light
          orange:   '#fd4816',  // exact SVG orange
          text:     '#fef7e9',  // SVG cream — the main text color
          muted:    '#8a8278',  // warm muted (toward SVG #9b939b)
          border:   '#2e2a24',  // warm border
          green:    '#8ff0a4',
          dark:     '#1a1714',  // warm dark
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
