import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'node',
  testTimeout: 30000,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};
export default config;
