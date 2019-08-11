module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:vue/recommended",
    'plugin:prettier/recommended',
    'prettier/vue'
  ],
  plugins: ["prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": "error",
    "no-unused-vars": process.env.NODE_ENV === "production" ? "error" : "off",
  }
};
