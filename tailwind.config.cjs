const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				// "primary-lighter": "#c7e4d0",
				// "primary-light": "#a1cfa9",
				// "primary": '#78a77E',
				// "primary-dark": "#5c7f5f",
				// "primary-darker": "#3f5740",
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif']
			}
		}
	},

	plugins: [
		plugin(function ({ addBase, theme }) {
			addBase({
				h1: { fontSize: theme('fontSize.5xl'), fontWeight: 'bold' },
				h2: { fontSize: theme('fontSize.3xl') },
				h3: { fontSize: theme('fontSize.xl') }
			});
		}),
		require('@tailwindcss/typography'),
		require('daisyui')
	]
};

module.exports = config;
