module.exports = {
    globals: {
    },
    testEnvironment: 'jest-environment-jsdom',
    roots: ["<rootDir>/src/pages"],
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    testPathIgnorePatterns: ["/node_modules/", "/build/"],
    collectCoverage: false,
    collectCoverageFrom: [
      "src/**/*.{js,jsx}",
    ],
    coveragePathIgnorePatterns: [],
  };
  