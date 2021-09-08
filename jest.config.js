module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.spec.(js|jsx)'],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  moduleNameMapper: {
    'worker!./': '<rootDir>/src/editor/decorators/decorateWorker.js',
    '@src(.*)': '<rootDir>/src/$1',
    '@editor(.*)': '<rootDir>/src/editor$1',
    '@components(.*)': '<rootDir>/src/components$1',
    '@utils(.*)': '<rootDir>/src/utils$1',
    '@config(.*)': '<rootDir>/src/config$1',
    '@plugins(.*)': '<rootDir>/src/plugins$1',
    '@assets(.*)': '<rootDir>/src/assets$1'
  },
  setupFiles: ['<rootDir>/src/setupTests.js'],
}
