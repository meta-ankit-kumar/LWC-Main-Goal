const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
    ...jestConfig,
    roots: ['<rootDir>/force-app/main/'],
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver']
};