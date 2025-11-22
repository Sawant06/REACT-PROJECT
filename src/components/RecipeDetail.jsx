import React from 'react'

export default function RecipeDetail({ recipe }) {
  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      <div className="detail-meta">
        <span><strong>Time:</strong> {recipe.time}</span>
        <span><strong>Difficulty:</strong> {recipe.difficulty}</span>
      </div>
      <div className="detail-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <h3>Steps</h3>
      <ol>
        {recipe.steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </div>
  )
}
