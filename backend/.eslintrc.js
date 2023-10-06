module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    overrides: [
        {
            env: {
                node: true
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script"
            }
        }
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest"
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "no-undef": "off",
        "@typescript-eslint/no-var-requires": 0,
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "@typescript-eslint/no-explicit-any": "off",
        "no-multi-spaces": "error",
        "no-multiple-empty-lines": "error",
        "prefer-const": "error"
    }
};
