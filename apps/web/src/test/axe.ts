import { configureAxe } from 'jest-axe'

export const axe = configureAxe({
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
  },
})

declare module 'vitest' {
  interface Matchers<R extends void | Promise<void> = void | Promise<void>> {
    toHaveNoViolations(): R
  }
}
