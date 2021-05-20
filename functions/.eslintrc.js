module.exports = {
	root: true,
	env: {
		es6: true,
		node: true
	},
	extends: ["eslint:recommended", "google"],
	rules: {
		quotes: ["error", "double"],
		"no-tabs": 0,
		indent: [2, "tab"],
		"comma-dangle": ["error", "never"],
		"one-var": ["error", "always"]
	}
};
