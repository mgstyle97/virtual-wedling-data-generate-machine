module.exports = {
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/$1',
    '@/(.*)$': '<rootDir>/src/$1',
    '@main/(.*)$': '<rootDir>/src/main/$1',
    '@test/(.*)$': '<rootDir>/src/test/$1',
  },
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
