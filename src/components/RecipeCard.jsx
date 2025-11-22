import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RecipeCard({ recipe, onSelect }) {
  const navigate = useNavigate()

  function handleClick() {
    if (onSelect) onSelect()
    navigate(`/recipes/${recipe.id}`)
  }

  return (
    <div className="card" onClick={handleClick} role="button" tabIndex={0}>
      <div className="card-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="card-body">
        <h3>{recipe.title}</h3>
        <p className="meta">{recipe.time} • {recipe.difficulty}</p>
      </div>
    </div>
  )
}
