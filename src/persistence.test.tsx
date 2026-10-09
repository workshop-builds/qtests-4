import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { parseStored } from './storage'

const KEY = 'qtests.counter'
const counter = () => screen.getByTestId('counter')
const click = () => fireEvent.click(screen.getByRole('button'))

describe('counter saved in the browser', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })
  afterEach(() => {
    vi.restoreAllMocks()
    window.localStorage.clear()
  })

  it('starts from the stored value and stores each change', () => {
    window.localStorage.setItem(KEY, '41')
    render(<App />)
    expect(counter()).toHaveTextContent(/^41$/)
    click()
    expect(counter()).toHaveTextContent(/^42$/)
    expect(window.localStorage.getItem(KEY)).toBe('42')
  })

  it('survives a refresh (unmount, then render again)', () => {
    const { unmount } = render(<App />)
    click()
    click()
    unmount()
    render(<App />)
    expect(counter()).toHaveTextContent(/^2$/)
  })

  it('reads a missing value (null) as 0', () => {
    expect(window.localStorage.getItem(KEY)).toBeNull()
    render(<App />)
    expect(counter()).toHaveTextContent(/^0$/)
  })

  it.each(['abc', '-5', '1.5', '', '1e3', 'NaN', '99999999999999999999'])(
    'reads %j as 0, does not crash, and keeps counting',
    (bad) => {
      window.localStorage.setItem(KEY, bad)
      render(<App />)
      expect(counter()).toHaveTextContent(/^0$/)
      click()
      expect(counter()).toHaveTextContent(/^1$/)
      expect(window.localStorage.getItem(KEY)).toBe('1')
    },
  )

  it('still works in memory when localStorage reads and writes throw', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('denied')
    })
    render(<App />)
    expect(counter()).toHaveTextContent(/^0$/)
    click()
    click()
    expect(counter()).toHaveTextContent(/^2$/)
  })

  it('still works when accessing window.localStorage itself throws', () => {
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new Error('SecurityError')
    })
    render(<App />)
    click()
    expect(counter()).toHaveTextContent(/^1$/)
  })
})

describe('parseStored', () => {
  it('accepts non-negative integers only', () => {
    expect(parseStored('0')).toBe(0)
    expect(parseStored('41')).toBe(41)
    expect(parseStored(null)).toBe(0)
    expect(parseStored('abc')).toBe(0)
    expect(parseStored('-5')).toBe(0)
    expect(parseStored('2.5')).toBe(0)
  })
})
