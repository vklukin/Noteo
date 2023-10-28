module.exports = {
    parser: "@typescript-eslint/parser",
    env: {
        browser: true,
        es2021: true,
        node: true,
        amd: true
    },
    extends: ["react-app", "plugin:react/recommended", "eslint:recommended"],
    overrides: [],
    parserOptions: {
        files: ["**/*.{js,jsx,ts,tsx}"],
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ["react"],
    rules: {
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "@typescript-eslint/no-explicit-any": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error"
    },
    settings: {
        react: {
            version: "detect"
        },
        "import/resolver": {
            node: {
                paths: ["src"],
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    }
};
