import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RecipeCard({ recipe, onSelect, onToggleFavorite }) {
  const navigate = useNavigate()

  function handleClick() {
    if (onSelect) onSelect()
    navigate(`/recipes/${recipe.id}`)
  }

  function handleFavClick(e) {
    e.stopPropagation()
    if (onToggleFavorite) onToggleFavorite()
  }

  return (
    <div className="card" onClick={handleClick} role="button" tabIndex={0}>
      <div className="card-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="card-body">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <h3 style={{margin:0}}>{recipe.title}</h3>
          <button className="fav" aria-label="toggle favorite" onClick={handleFavClick}>{recipe.favorite ? '★' : '☆'}</button>
        </div>
        <p className="meta">{recipe.time} • {recipe.difficulty}</p>
      </div>
    </div>
  )
}
