import React, { useEffect, useState } from 'react'
import RecipeList from './components/RecipeList'
import RecipeDetail from './components/RecipeDetail'
import AddRecipe from './components/AddRecipe'
import AdvancedControls from './components/AdvancedControls'
import { initialRecipes } from './data/recipes'
import { loadRecipes, saveRecipes } from './utils/storage'
import { useParams, useNavigate } from 'react-router-dom'

export default function App() {
  const [recipes, setRecipes] = useState(() => loadRecipes() ?? initialRecipes)
  const [selected, setSelected] = useState(null)
  const { id } = useParams() || {}
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [sortBy, setSortBy] = useState('new')
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    saveRecipes(recipes)
  }, [recipes])

  useEffect(() => {
    if (id) {
      const found = recipes.find(r => r.id === id)
      setSelected(found || null)
    }
  }, [id, recipes])

  function toggleFavorite(recipeId) {
    setRecipes(prev => prev.map(r => r.id === recipeId ? { ...r, favorite: !r.favorite } : r))
  }

  function exportRecipes() {
    const dataStr = JSON.stringify(recipes, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'recipes.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function importRecipes(json) {
    if (!Array.isArray(json)) {
      alert('Imported file must be an array of recipes')
      return
    }
    // Basic validation: ensure ids exist
    const sanitized = json.map((r, i) => ({ ...r, id: r.id ?? `imp-${Date.now()}-${i}` }))
    setRecipes(sanitized)
    saveRecipes(sanitized)
    setSelected(null)
    navigate('/')
  }

  function resetDefaults() {
    localStorage.removeItem('baking.recipes')
    setRecipes(initialRecipes)
    setSelected(null)
    navigate('/')
  }

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

  // derive filtered/sorted recipes
  const derive = () => {
    let list = [...recipes]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(r => (r.title || '').toLowerCase().includes(q) || (r.ingredients||[]).some(i => i.toLowerCase().includes(q)))
    }
    if (difficulty) {
      list = list.filter(r => r.difficulty === difficulty)
    }
    if (showFavorites) {
      list = list.filter(r => r.favorite)
    }
    if (sortBy === 'title') list.sort((a,b) => a.title.localeCompare(b.title))
    else if (sortBy === 'old') list.sort((a,b) => (parseInt(a.id)||0) - (parseInt(b.id)||0))
    else list.sort((a,b) => (parseInt(b.id)||0) - (parseInt(a.id)||0))
    return list
  }

  const visibleRecipes = derive()

  return (
    <div className="app">
      <header className="header">
        <h1>Baking Project — Recipes</h1>
      </header>
      <main className="main">
        <aside className="sidebar">
          <AddRecipe onAdd={handleAdd} />
          <AdvancedControls
            search={search}
            onSearch={setSearch}
            difficulty={difficulty}
            onDifficulty={setDifficulty}
            sortBy={sortBy}
            onSort={setSortBy}
            showFavorites={showFavorites}
            onShowFavorites={setShowFavorites}
            onExport={exportRecipes}
            onImport={importRecipes}
            onReset={resetDefaults}
          />
          <RecipeList recipes={visibleRecipes} onSelect={handleSelect} onToggleFavorite={toggleFavorite} />
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
