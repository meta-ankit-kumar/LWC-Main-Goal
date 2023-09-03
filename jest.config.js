const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
    ...jestConfig,
    roots: ['<rootDir>/force-app/main/'],
    testMatch: ['**/__tests__/**/*.test.js'],
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver'],
    coveragePathIgnorePatterns: ['/force-app/main/default/lwc/teamList/teamList.js'],
};