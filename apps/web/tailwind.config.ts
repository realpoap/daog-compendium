import daisyui from 'daisyui';
import icons from 'rocketicons/tailwind';
import type { Config } from 'tailwindcss';

import sharedConfig from '@repo/tailwind-config';

const config: Pick<Config, 'content' | 'presets' | 'darkMode' | 'plugins' | 'theme'> = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
  darkMode: 'media',
  plugins: [icons, daisyui],
  theme: {
    extend: {
      screen: {
        'widescreen': {'raw': '(min-aspect-ratio: 3/2)'},
        'tallscreen': {'raw': '(min-aspect-ratio: 13/20)'}
      },
      fontFamily: {
        grenze: ["Grenze", "serif"],
        garamond: ["EB Garamond", "sans-serif"],
        noto: ["Noto Serif", "sans-serif"],
      },
    },
  },
  
};

export default config;
