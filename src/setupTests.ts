import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
  // The counter is persisted, so keep tests independent of each other.
  window.localStorage.clear()
})
