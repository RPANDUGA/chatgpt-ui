module.exports = {
    testEnvironment: 'jsdom', // Ensure the correct environment for React testing
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Use Babel for transforming JavaScript files
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(axios)/)', // Allow Jest to transform `axios`
    ],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS imports
    },
};