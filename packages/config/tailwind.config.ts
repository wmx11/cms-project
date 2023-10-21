import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const tailwindConfig: Config = {
  content: [
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    '../../packages/template-engine/**/*.{js,ts,jsx,tsx,mdx,json}',
    '../../packages/templates/**/*.{js,ts,jsx,tsx,mdx,json}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx,json}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: { extend: {} },
  darkMode: 'class',
  plugins: [nextui()],
};

export default tailwindConfig;
