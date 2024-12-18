import daisyui from 'daisyui';
import icons from 'rocketicons/tailwind';
import type { Config } from 'tailwindcss';

import sharedConfig from '@repo/tailwind-config';

const config: Pick<Config, 'content' | 'presets' | 'darkMode' | 'plugins' | 'theme' | 'daisyui'> = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
  darkMode: 'media',
  plugins: [icons, daisyui],
  theme: {
    extend: {
      screen: {
        'hover-hover': {'raw': '(hover: hover) and (pointer: fine)'},
      },
      fontFamily: {
        grenze: ["Grenze", "serif"],
        garamond: ["EB Garamond", "sans-serif"],
        noto: ["Noto Serif", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#a991f7",
          "secondary": "#4a044e",
          "accent": "#9ACD32",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  }
  
};

export default config;
