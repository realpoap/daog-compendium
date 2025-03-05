import daisyui from 'daisyui';
import icons from 'rocketicons/tailwind';
import type { Config } from 'tailwindcss';

import sharedConfig from '@repo/tailwind-config';

const config: Pick<
	Config,
	'content' | 'presets' | 'darkMode' | 'plugins' | 'theme' | 'daisyui'
> = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	presets: [sharedConfig],
	darkMode: ['media', 'class'],
	plugins: [icons, daisyui, require('tailwindcss-animate')],
	theme: {
		extend: {
			screen: {
				'hover-hover': {
					raw: '(hover: hover) and (pointer: fine)',
				},
			},
			fontFamily: {
				grenze: ['Grenze', 'serif'],
				noto: ['Cabin', 'sans-serif'],
				cabin: ['Cabin', 'sans-serif'],
			},
			colors: {
				amethyst: {
					'50': '#faf5ff',
					'100': '#f4e8ff',
					'200': '#ebd5ff',
					'300': '#dab4fe',
					'400': '#c184fc',
					'500': '#a855f7',
					'600': '#9133ea',
					'700': '#7a22ce',
					'800': '#6621a8',
					'900': '#531c87',
					'950': '#370764',
				},
				goldenrod: {
					'50': '#fefaec',
					'100': '#fbf1ca',
					'200': '#f7e290',
					'300': '#f3cf59',
					'400': '#f0ba2f',
					'500': '#e99b17',
					'600': '#ce7611',
					'700': '#ab5412',
					'800': '#8b4215',
					'900': '#723715',
					'950': '#421b06',
				},
				atlantis: {
					'50': '#f7fbea',
					'100': '#ecf7d0',
					'200': '#daefa7',
					'300': '#bfe274',
					'400': '#9acd32',
					'500': '#87b82a',
					'600': '#68921e',
					'700': '#4f701b',
					'800': '#41591b',
					'900': '#374c1b',
					'950': '#1c290a',
				},
			},
			keyframes: {
				wiggle: {
					'0%, 100%': {
						transform: 'rotate(-3deg)',
					},
					'50%': {
						transform: 'rotate(3deg)',
					},
				},
				shake: {
					'10%, 90%': {
						transform: 'translate3d(0px, 0, 0)',
					},
					'20%, 80%': {
						transform: 'translate3d(-1px, 0, 0)',
					},
					'30%, 50%, 70%': {
						transform: 'translate3d(0px, 0, 0)',
					},
					'40%, 60%': {
						transform: 'translate3d(1px, 0, 0)',
					},
				},
				text: {
					'0%, 100%': {
						'background-size': '100% 100%',
						'background-position': 'center center',
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'center center',
					},
					'80%': {
						'background-size': '80% 100%',
						'background-position': 'center center',
					},
				},
			},
			animation: {
				wiggle: 'wiggle 1s ease-in-out infinite',
				shake: 'shake 0.5s infinite',
				text: 'text 5s ease-in-out infinite',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#c184fc',
					secondary: '#5d2a65',
					accent: '#9ACD32',
					neutral: '#78716c',
					'base-100': '#ffffff',
				},
			},
		],
	},
};

export default config;
