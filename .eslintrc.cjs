const gatsbyPreset = require.resolve("babel-preset-gatsby")

module.exports = {
  root: true,
  ignorePatterns: ["node_modules/", "public/", ".cache/"],
  settings: {
    react: {
      version: "detect"
    }
  },
  overrides: [
    {
      files: ["src/**/*.js", "gatsby-browser.js"],
      env: {
        browser: true,
        es2021: true
      },
      globals: {
        process: "readonly"
      },
      extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
      ],
      parser: "@babel/eslint-parser",
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        requireConfigFile: false,
        babelOptions: {
          configFile: false,
          presets: [gatsbyPreset]
        },
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        "react/no-unescaped-entities": "off",
        "react/prop-types": "off"
      }
    },
    {
      files: ["gatsby-config.js", "gatsby-node.js", "scripts/**/*.js"],
      env: {
        es2021: true,
        node: true
      },
      extends: ["eslint:recommended"],
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "script"
      }
    }
  ]
}
