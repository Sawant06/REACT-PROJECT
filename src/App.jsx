import React, { useEffect, useState } from 'react'
import RecipeList from './components/RecipeList'
import RecipeDetail from './components/RecipeDetail'
import AddRecipe from './components/AddRecipe'
import { initialRecipes } from './data/recipes'
import { loadRecipes, saveRecipes } from './utils/storage'
import { useParams, useNavigate } from 'react-router-dom'

export default function App() {
  const [recipes, setRecipes] = useState(() => loadRecipes() ?? initialRecipes)
  const [selected, setSelected] = useState(null)
  const { id } = useParams() || {}
  const navigate = useNavigate()

  useEffect(() => {
    saveRecipes(recipes)
  }, [recipes])

  useEffect(() => {
    if (id) {
      const found = recipes.find(r => r.id === id)
      setSelected(found || null)
    }
  }, [id, recipes])

  function handleSelect(id) {
    setSelected(recipes.find(r => r.id === id) || null)
  }

  function handleAdd(recipe) {
    const newRecipe = { ...recipe, id: Date.now().toString() }
    setRecipes(prev => [newRecipe, ...prev])
    setSelected(newRecipe)
    // navigate to the new recipe's URL
    try {
      navigate(`/recipes/${newRecipe.id}`)
    } catch (e) {
      // ignore if navigation not available
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Baking Project — Recipes</h1>
      </header>
      <main className="main">
        <aside className="sidebar">
          <AddRecipe onAdd={handleAdd} />
          <RecipeList recipes={recipes} onSelect={handleSelect} />
        </aside>
        <section className="detail">
          {selected ? (
            <RecipeDetail recipe={selected} />
          ) : (
            <div className="empty">Select a recipe to view details</div>
          )}
        </section>
      </main>
    </div>
  )
}
