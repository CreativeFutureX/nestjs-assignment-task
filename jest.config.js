const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "json"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "/e2e/.*\\.(e2e-test|e2e-spec).(ts|tsx|js)$",
    "collectCoverageFrom" : ["src/**/*.{js,jsx,tsx,ts}", "!**/node_modules/**", "!**/vendor/**"],
    "coverageReporters": ["json", "lcov"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
