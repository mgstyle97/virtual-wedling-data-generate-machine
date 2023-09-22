module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/../../$1',
    '@/(.*)$': '<rootDir>/../../src/$1',
    '@main/(.*)$': '<rootDir>/../../src/main/$1',
    '@test/(.*)$': '<rootDir>/../../src/test/$1',
  },
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
