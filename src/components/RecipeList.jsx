import React from 'react'
import RecipeCard from './RecipeCard'

export default function RecipeList({ recipes, onSelect }) {
  return (
    <div className="recipe-list">
      {recipes.map(r => (
        <RecipeCard key={r.id} recipe={r} onSelect={() => onSelect(r.id)} />
      ))}
    </div>
  )
}
