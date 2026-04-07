const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/__tests__/fixtures/",
    "<rootDir>/__tests__/e2e/",
    "<rootDir>/__tests__/utils/",
    "<rootDir>/__tests__/mocks/",
  ],
};

module.exports = async () => {
  const jestConfig = await createJestConfig(customJestConfig)();
  return {
    ...jestConfig,
    transformIgnorePatterns: [
      "/node_modules/(?!(next-intl|use-intl|intl-messageformat|@formatjs)/)",
      "^.+\\.module\\.(css|sass|scss)$",
    ],
  };
};
