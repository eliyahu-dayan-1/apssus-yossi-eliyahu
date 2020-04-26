module.exports = {
  "parser": "/usr/local/lib/node_modules/babel-eslint",
  "extends": "airbnb/base",
  "extends": [
    "airbnb/base",
    "plugin:react/recommended"
],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "node": true,
    "browser": true,
    "jquery": true,
  },
  "globals": {
      "ReactDOM": true,
      "React": true,
      "ReactRouterDOM": true,
  },
  "rules": {
    "no-plusplus": 0,
    "react/react-in-jsx-scope": 0,
    "class-methods-use-this": 0,
    "jsx-quotes": 1,
    "import/extensions": 0,
    "no-use-before-define": 0,
    "react/jsx-no-undef": [1, { "allowGlobals": true }],
    "react/prop-types": 0,
    "react/jsx-curly-spacing": [1, {"when": "always", "allowMultiline": true}]
  },
}
