import type { Config } from 'tailwindcss';

const pxToRem = (px: number, base = 16) => `${px / base}rem`;

const range = (start: number, end: number) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    spacing: {
      ...range(1, 2401).reduce<Record<string, string>>((acc, px) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    fontSize: {
      ...range(12, 81).reduce<Record<string, string>>((acc, px) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'var-black': '#1B1B1B',
        'var-primary': '#333236',
        'var-gray1': '#4B4B4B',
        'var-gray2': '#79747E',
        'var-gray3': '#A4A1AA',
        'var-gray4': '#ADAEB8',
        'var-gray5': '#CBC9CF',
        'var-gray6': '#DDDDDD',
        'var-gray7': '#EEEEEE',
        'var-gray8': '#FAFAFA',
        'var-gray9': '#A1A1A1',
        'var-green': '#00AC07',
        'var-green2': '#CED8D5',
        'var-green-dark': '#0B3B2D',
        'var-green-dark2': '#112211',
        'var-green-light': '#F1EFFD',
        'var-red-dark': '#FF472E',
        'var-red-light': '#FFE4E0',
        'var-orange-dark': '#FF7C1D',
        'var-orange': '#FFF4E8',
        'var-yellow': '#FFC23D',
        'var-blue': '#0085FF',
        'var-blue-dark': '#2EB4FF',
        'var-blue-light': '#E5F3FF',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      screens: {
        md: { min: '450px' },
        lg: { min: '1024px' },
        xl: { min: '1245px' },
      },
      inset: {
        unset: 'unset',
      },
      boxShadow: {
        custom: '0 10px 20px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
} satisfies Config;

export default config;
