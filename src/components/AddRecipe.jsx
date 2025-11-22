import React, { useState } from 'react'

export default function AddRecipe({ onAdd }) {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [difficulty, setDifficulty] = useState('Easy')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [image, setImage] = useState('https://placehold.co/600x400?text=Bake')

  function submit(e) {
    e.preventDefault()
    if (!title.trim()) return
    const newRecipe = {
      title: title.trim(),
      time: time.trim() || '—',
      difficulty,
      image: image.trim() || 'https://placehold.co/600x400?text=Bake',
      ingredients: ingredients.split('\n').map(s => s.trim()).filter(Boolean),
      steps: steps.split('\n').map(s => s.trim()).filter(Boolean),
    }
    onAdd(newRecipe)
    setTitle('')
    setTime('')
    setDifficulty('Easy')
    setIngredients('')
    setSteps('')
    setImage('https://placehold.co/600x400?text=Bake')
  }

  return (
    <form className="add-recipe" onSubmit={submit}>
      <h2>Add Recipe</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={time} onChange={e => setTime(e.target.value)} placeholder="Time (e.g., 45 min)" />
      <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} placeholder="Ingredients (one per line)" />
      <textarea value={steps} onChange={e => setSteps(e.target.value)} placeholder="Steps (one per line)" />
      <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
      <button type="submit">Add</button>
    </form>
  )
}
