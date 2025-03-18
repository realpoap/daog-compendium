export default {
	content: ['./index.html', './src/**/*.{ js, ts, jsx, tsx } '],
	darkMode: ['media', 'class'],
	// plugins: [icons, require('tailwindcss-animate')],
	theme: {
		extend: {
			screen: {
				'hover-hover': {
					raw: '(hover: hover) and (pointer: fine)',
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
				shine: {
					'0%': { left: '-100px' },
					'60%': { left: '100%' },
					to: { left: '100%' },
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
				shine: 'shine 1.5s ease-out infinite',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
};
