module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest'
    },
    moduleNameMapper: {
        '^@server/(.*)$': '<rootDir>/src/server/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1'
    },
    testMatch: [
        '**/__tests__/(unit|integration|e2e)/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)'
    ],
    coveragePathIgnorePatterns: [
        '<rootDir>/node_modules',
        '<rootDir>/__tests__/factory',
        '<rootDir>/__tests__/helpers'
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
};