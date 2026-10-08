import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {
    fontFamily: { sans: ['Inter Variable', 'system-ui', 'sans-serif'] },
    borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
    colors: {
      ninc: { 50: '#eef3ff', 100: '#e0e9ff', 200: '#c7d8ff', 300: '#a5bbff', 400: '#7c91ff', 500: '#5865f2', 600: '#3542da', 700: '#1026a8', 800: '#152786', 900: '#142368', 950: '#060d3d' },
      background: 'hsl(var(--background))', foreground: 'hsl(var(--foreground))',
      border: 'hsl(var(--border))', input: 'hsl(var(--input))', ring: 'hsl(var(--ring))',
      primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
      secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
      muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
      accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
      popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
      destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
    },
    keyframes: {
      'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
      'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
    },
    animation: { 'accordion-down': 'accordion-down 0.2s ease-out', 'accordion-up': 'accordion-up 0.2s ease-out' },
  } },
  plugins: [require('tailwindcss-animate')],
};
export default config;
