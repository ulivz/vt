module.exports = {
  globals: {
    "ts-jest": {
      diagnostics: false,
      tsconfig: "tsconfig.test.json",
    },
  },
  testEnvironment: "node",
  setupFilesAfterEnv: [`${__dirname}/jest.setup.js`],
  testMatch: ["**/(*.)+(spec|test).ts?(x)"],
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
  snapshotSerializers: ["jest-serializer-path"],
  coveragePathIgnorePatterns: ["/__tests__/", "/__fixtures__/", "/bin/"],
  collectCoverageFrom: ["packages/**/src/**/*.{ts,tsx}"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
