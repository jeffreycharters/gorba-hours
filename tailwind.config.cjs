module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			boxShadow: {
				'inner-sm': '1px 1px 1px inset hsla(0, 0%, 0%, 0.4)',
				'inner-md': '2px 2px 2px inset hsla(0, 0%, 0%, 0.4)'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
