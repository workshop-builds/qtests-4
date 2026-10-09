import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { parseMilestones } from './plan'

describe('project page', () => {
  it('shows the project name, description and plan milestones', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Quiet Test Sol' })).toBeInTheDocument()
    expect(screen.getByText(/one big button/i)).toBeInTheDocument()
    const items = screen.getAllByRole('listitem')
    expect(items.map((li) => li.textContent)).toEqual([
      'Counter page with a big button',
      'Counter saved in the browser',
    ])
  })
})

describe('parseMilestones', () => {
  it('extracts numbered milestone headings', () => {
    const md = '# Plan\n\n## Milestone 1: First\ntext\n## Milestone 2: Second thing\n'
    expect(parseMilestones(md)).toEqual([
      { number: 1, title: 'First' },
      { number: 2, title: 'Second thing' },
    ])
  })
})
