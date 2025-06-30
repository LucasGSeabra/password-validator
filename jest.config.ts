const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|mjs|js)$": [
      "jest-preset-angular",
      {
        tsconfig: "tsconfig.spec.json",
        stringifyContentPathRegex: "\\.(html|svg)$",
      },
    ],
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: "<rootDir>/",
    }),
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/app/**/*.ts",
    "!src/app/**/*.module.ts",
    "!src/app/**/*.config.ts",
    "!src/app/**/*.routes.ts",
    "!src/app/**/index.ts",
    "!src/app/**/*.d.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text", "text-summary", "lcov"],
  testMatch: ["<rootDir>/src/**/*.spec.ts", "<rootDir>/src/**/*.test.ts"],
  moduleFileExtensions: ["ts", "html", "js", "json", "mjs"],
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$|@angular|@ngrx|ngx-)"],
  snapshotSerializers: [
    "jest-preset-angular/build/serializers/no-ng-attributes",
    "jest-preset-angular/build/serializers/ng-snapshot",
    "jest-preset-angular/build/serializers/html-comment",
  ],
};
