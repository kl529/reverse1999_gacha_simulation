import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules",
      ".next",
      "dist",
      "out",
      "coverage",
      "public",
      "jest.config.js",
      "next.config.ts",
      "public/sw.js",
      ".vercel",
    ], // 추가된 ignore 설정
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
