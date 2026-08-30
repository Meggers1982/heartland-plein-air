// `vitest.config.ts` sets `globals: true`, so tests call describe/it/expect
// without importing them. TypeScript doesn't read that config, so without this
// reference `npx tsc --noEmit` reported 28 "Cannot find name 'describe'"
// errors across the test files — enough noise to hide a real type error.
/// <reference types="vitest/globals" />
