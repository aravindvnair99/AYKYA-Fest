module.exports = {
	root: true,
	env: {
		es6: true,
		node: true
	},
	extends: ["eslint:recommended", "google"],
	rules: {
		"quote-props": ["error", "as-needed"],
		quotes: ["error", "double"],
		"no-tabs": ["error", {allowIndentationTabs: true}],
		indent: [2, "tab"],
		"comma-dangle": ["error", "never"],
		"one-var": ["error", "always"]
	}
};
