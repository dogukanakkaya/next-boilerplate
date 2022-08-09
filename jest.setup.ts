import { jest } from '@jest/globals';
import { loadEnvConfig } from '@next/env';

global.console = {
    ...console,
    info: jest.fn()
};

loadEnvConfig(process.cwd());
