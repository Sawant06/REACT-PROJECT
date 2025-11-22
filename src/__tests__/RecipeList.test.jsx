import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RecipeList from '../components/RecipeList'

const recipes = [
  { id: 'a', title: 'One', time: '10m', difficulty: 'Easy', image: '' },
  { id: 'b', title: 'Two', time: '20m', difficulty: 'Medium', image: '' },
]

describe('RecipeList', () => {
  it('renders list of recipes', () => {
    render(<RecipeList recipes={recipes} onSelect={() => {}} />)
    expect(screen.getByText(/One/)).toBeDefined()
    expect(screen.getByText(/Two/)).toBeDefined()
  })
})
