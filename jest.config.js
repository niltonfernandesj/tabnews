const dotenv = require("dotenv");
const nextJest = require("next/jest");

dotenv.config({ path: ".env.development" });

const createJestConfig = nextJest({
  dir: "./",
});

module.exports = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/.git/",
  ],
  watchman: false,
});
