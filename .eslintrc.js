module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "jsx-a11y", "import", "unused-imports", "prettier"],
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended", // prettier와 충돌 방지
  ],
  rules: {
    "prettier/prettier": "error",
    "unused-imports/no-unused-imports": "warn",
    "react/react-in-jsx-scope": "off", // Next.js는 필요 없음
    "@typescript-eslint/no-unused-vars": "off",
    "no-unused-vars": "off",
  },
};
