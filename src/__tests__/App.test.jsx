import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App'
import { MemoryRouter } from 'react-router-dom'

beforeEach(() => {
  localStorage.clear()
})

describe('App', () => {
  it('renders initial recipes', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText(/Classic Chocolate Cake/i)).toBeDefined()
    expect(screen.getByText(/Simple Sourdough Loaf/i)).toBeDefined()
  })

  it('adds a recipe and shows it in the list and detail', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    )

    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('Title'), 'Test Pie')
    await user.type(screen.getByPlaceholderText('Time (e.g., 45 min)'), '30 min')
    await user.type(screen.getByPlaceholderText('Ingredients (one per line)'), 'Flour\nSugar')
    await user.type(screen.getByPlaceholderText('Steps (one per line)'), 'Mix\nBake')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(await screen.findByText(/Test Pie/)).toBeDefined()
    // detail view should show ingredient
    expect(screen.getByText(/Flour/)).toBeDefined()
  })
})
