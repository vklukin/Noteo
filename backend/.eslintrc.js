module.exports = {
    parser: "@typescript-eslint/parser",
    env: {
        es6: true,
        node: true,
        es2021: true
    },
    extends: ["eslint:recommended", "prettier"],
    overrides: [],
    parserOptions: {
        files: ["**/*.{js,jsx,ts,tsx}"],
        ecmaVersion: "latest",
        sourseType: "commonjs"
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "no-var": "error",
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "@typescript-eslint/no-explicit-any": "off",
        "no-multi-spaces": "error",
        "no-multiple-empty-lines": "error",
        "prefer-const": "error"
    },
    settings: {
        "import/resolver": {
            node: {
                paths: ["src"],
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    }
}
