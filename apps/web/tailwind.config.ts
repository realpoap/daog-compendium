/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import icons from 'rocketicons/tailwind';
import type { Config } from 'tailwindcss';

import sharedConfig from '@repo/tailwind-config';

const config: Pick<Config, 'content' | 'presets' | 'darkMode' | 'plugins' | 'theme' | 'daisyui'> = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
  darkMode: 'media',
  plugins: [icons, daisyui ],
  theme: {
    extend: {
      screen: {
        'hover-hover': {'raw': '(hover: hover) and (pointer: fine)'},
      },
      fontFamily: {
        grenze: ["Grenze", "serif"],
        noto: ["Cabin", "sans-serif"],
        cabin: ["Cabin", "sans-serif"],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-3deg)'
          },
          '50%': {
            transform: 'rotate(3deg)'
          },
        },
        shake: {
          '10%, 90%': {
            transform: 'translate3d(0px, 0, 0)'
          },
          '20%, 80%': {
            transform: 'translate3d(-1px, 0, 0)'
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(0px, 0, 0)'
          },

          '40%, 60%': {
            transform: 'translate3d(1px, 0, 0)'
          },
      }},
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        shake: 'shake 0.5s infinite',
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
