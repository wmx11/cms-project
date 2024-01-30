import {
  ACCENT,
  ACCENT_FOREGROUND_VAR,
  ACCENT_VAR,
  BACKGROUND,
  BACKGROUND_VAR,
  BORDER,
  BORDER_VAR,
  BUILDER_PREFIX,
  CARD,
  CARD_FOREGROUND_VAR,
  CARD_VAR,
  DESTRUCTIVE,
  DESTRUCTIVE_FOREGROUND_VAR,
  DESTRUCTIVE_VAR,
  FOREGROUND,
  FOREGROUND_VAR,
  INPUT,
  INPUT_VAR,
  MUTED,
  MUTED_FOREGROUND_VAR,
  MUTED_VAR,
  POPOVER,
  POPOVER_FOREGROUND_VAR,
  POPOVER_VAR,
  PRIMARY,
  PRIMARY_FOREGROUND_VAR,
  PRIMARY_VAR,
  RADIUS_VAR,
  RING,
  RING_VAR,
  SECONDARY,
  SECONDARY_FOREGROUND_VAR,
  SECONDARY_VAR,
} from '@cms/packages/template-engine/constants';
import type { Config } from 'tailwindcss';
import tailwindCssAnimate from 'tailwindcss-animate';
import { fontFamily } from 'tailwindcss/defaultTheme';

const hsl = (value: string) =>
  `hsl(var(${value}, var(${value.replace(`${BUILDER_PREFIX}-`, '')})))`;

const tailwindConfig: Config = {
  content: [
    '../../packages/template-engine/**/*.{js,ts,jsx,tsx,mdx,json}',
    '../../packages/templates/**/*.{js,ts,jsx,tsx,mdx,json}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx,json}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  plugins: [tailwindCssAnimate],
  theme: {
    extend: {
      colors: {
        [BORDER]: hsl(BORDER_VAR),
        border: 'hsl(var(--border))',
        [INPUT]: hsl(INPUT_VAR),
        input: 'hsl(var(--input))',
        [RING]: hsl(RING_VAR),
        ring: 'hsl(var(--ring))',
        [BACKGROUND]: hsl(BACKGROUND_VAR),
        background: 'hsl(var(--background))',
        [FOREGROUND]: hsl(FOREGROUND_VAR),
        foreground: 'hsl(var(--foreground))',
        [PRIMARY]: {
          DEFAULT: hsl(PRIMARY_VAR),
          foreground: hsl(PRIMARY_FOREGROUND_VAR),
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        [SECONDARY]: {
          DEFAULT: hsl(SECONDARY_VAR),
          foreground: hsl(SECONDARY_FOREGROUND_VAR),
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        [DESTRUCTIVE]: {
          DEFAULT: hsl(DESTRUCTIVE_VAR),
          foreground: hsl(DESTRUCTIVE_FOREGROUND_VAR),
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        [MUTED]: {
          DEFAULT: hsl(MUTED_VAR),
          foreground: hsl(MUTED_FOREGROUND_VAR),
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        [ACCENT]: {
          DEFAULT: hsl(ACCENT_VAR),
          foreground: hsl(ACCENT_FOREGROUND_VAR),
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        [POPOVER]: {
          DEFAULT: hsl(POPOVER_VAR),
          foreground: hsl(POPOVER_FOREGROUND_VAR),
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        [CARD]: {
          DEFAULT: hsl(CARD_VAR),
          foreground: hsl(CARD_FOREGROUND_VAR),
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
        'tg-lg': `var(${RADIUS_VAR})`,
        'tg-md': `calc(var(${RADIUS_VAR}) - 2px)`,
        'tg-sm': `calc(var(${RADIUS_VAR}) - 4px)`,
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
};

export default tailwindConfig;
