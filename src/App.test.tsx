import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('counter page', () => {
  it('starts at 0 with one native add-one button', () => {
    render(<App />)
    expect(screen.getByTestId('counter')).toHaveTextContent(/^0$/)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(1)
    expect(buttons[0].tagName).toBe('BUTTON')
    expect(buttons[0]).toHaveAttribute('type', 'button')
    expect(buttons[0]).toHaveTextContent('+1')
  })

  it('shows 1 after one click and 3 after three clicks', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: '+1' })
    fireEvent.click(button)
    expect(screen.getByTestId('counter')).toHaveTextContent(/^1$/)
    fireEvent.click(button)
    fireEvent.click(button)
    expect(screen.getByTestId('counter')).toHaveTextContent(/^3$/)
  })

  it('works from the keyboard with Enter and Space', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.tab()
    expect(screen.getByRole('button')).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByTestId('counter')).toHaveTextContent(/^1$/)
    await user.keyboard(' ')
    expect(screen.getByTestId('counter')).toHaveTextContent(/^2$/)
  })

  it('announces changes politely to assistive technology', () => {
    render(<App />)
    expect(screen.getByTestId('counter')).toHaveAttribute('aria-live', 'polite')
  })

  it('is sized for 375px and 1280px: button >= 120px tall, counter >= 4rem', () => {
    render(<App />)
    // min-h-40 = 10rem = 160px; text-7xl = 4.5rem (larger from the sm breakpoint up)
    expect(screen.getByRole('button')).toHaveClass('min-h-40', 'w-full', 'max-w-md')
    expect(screen.getByTestId('counter')).toHaveClass('text-7xl')
  })
})
