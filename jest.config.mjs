import { defineJestConfig } from '@ice/app';

export default defineJestConfig({
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        // swc 配置
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
});
