import React from 'react'
import RecipeCard from './RecipeCard'

export default function RecipeList({ recipes, onSelect, onToggleFavorite }) {
  return (
    <div className="recipe-list">
      {recipes.map(r => (
        <RecipeCard key={r.id} recipe={r} onSelect={() => onSelect(r.id)} onToggleFavorite={() => onToggleFavorite && onToggleFavorite(r.id)} />
      ))}
    </div>
  )
}
