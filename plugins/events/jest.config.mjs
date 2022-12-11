/** @type {import('jest').Config} */
export default {
  displayName: 'events',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  roots: ['<rootDir>/ts'],
  testMatch: ['**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
  transform: {
    '^.+\\.m?[t]sx?$': ['ts-jest', {
      isolatedModules: true,
      useESM: true
    }],
  }
}
