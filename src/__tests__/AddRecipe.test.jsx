import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import AddRecipe from '../components/AddRecipe'

describe('AddRecipe', () => {
  it('calls onAdd and clears form', async () => {
    const onAdd = vi.fn()
    render(<AddRecipe onAdd={onAdd} />)
    const user = userEvent.setup()

    await user.type(screen.getByPlaceholderText('Title'), 'Mini Tart')
    await user.type(screen.getByPlaceholderText('Time (e.g., 45 min)'), '20 min')
    await user.type(screen.getByPlaceholderText('Ingredients (one per line)'), 'Flour')
    await user.type(screen.getByPlaceholderText('Steps (one per line)'), 'Bake')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(onAdd).toHaveBeenCalled()
    expect(screen.getByPlaceholderText('Title').value).toBe('')
  })
})
