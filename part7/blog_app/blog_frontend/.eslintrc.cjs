// eslint-disable-next-line no-undef
module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "cypress/globals": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "prettier"],
  "overrides": [
    {
      "files": [
        ".eslintrc.{js,cjs}"
      ],
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react", "cypress"
  ],
  "rules": {
    "quotes": [
      "warn",
      "double"
    ],
    "semi": [
      "warn",
      "always"
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": 1,
    "react/react-in-jsx-scope": "off"
  }
};
