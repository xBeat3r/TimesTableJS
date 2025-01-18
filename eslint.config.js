import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import hooksPlugin from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
    {
        ignores: ["*.js", "*.mjs", "dist"],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    reactRecommended,
    reactJsxRuntime,
    {
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    // Reference: https://github.com/facebook/react/issues/28313
    {
        plugins: {
            "react-hooks": hooksPlugin,
        },
        rules: hooksPlugin.configs.recommended.rules,
    },
    reactRefresh.configs.vite,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    caughtErrors: "all",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                },
            ],
            "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
            "no-restricted-imports": [
                "error",
                {
                    paths: [
                        {
                            name: "lodash",
                        },
                    ],
                },
            ],
            "no-restricted-syntax": [
                "error",
                {
                    selector: 'ImportDeclaration[source.value="lodash-es"] ImportDefaultSpecifier',
                    message: `Instead use: import * as _ from "lodash-es";`,
                },
            ],
            "react/no-unknown-property": "off",
        },
    },
);
