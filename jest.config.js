const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
    ...jestConfig,
    roots: ['<rootDir>/force-app/main/'],
    testMatch: ['**/__tests__/**/*.test.js'],
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver'],
    coveragePathIgnorePatterns: ['<rootDir>/force-app/main/default/lwc/teamList/teamList.js'], 
};