module.exports = {
    root: true,
    ignorePatterns: [],
    env: { node: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    parser: "",
    "plugins": ["@typescript-eslint", "simple-import-sort"],
    parserOptions: {
        ecmaVersion: 2020,
        "parser": "@typescript-eslint/parser",
        "sourceType": ""
    },
    rules: {
        "simple-import-sort/imports": "error",
        "object-curly-spacing": ["error", "always"],
        "object-curly-newline": ["error", {
            "ObjectExpression": {
                "multiline": true,
                "minProperties": 2
            },
            "ImportDeclaration": "never",
        }],
        "object-property-newline": ["error", { allowAllPropertiesOnSameLine: false }],
        "@typescript-eslint/no-explicit-any": "error",
        "semi": ["error", "always"],
        "no-trailing-spaces": "error",
        "comma-dangle": "error",
        "max-len": [
            "warn",
            {
                tabWidth: 4,
                code: 120,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true
            },
        ],
        quotes: ["error", "double"],
        "padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                prev: "*",
                next: "return"
            },
        ],
        "@typescript-eslint/indent": ["error", 4, { "SwitchCase": 1, }],
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "@typescript-eslint/no-empty-interface": [
            "error",
            { allowSingleExtends: true, },
        ]
    }
};
