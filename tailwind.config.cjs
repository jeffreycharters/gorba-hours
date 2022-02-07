module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			boxShadow: {
				'inner-md': '2px 2px 2px inset hsl(202, 15%, 90%)'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
