import React, { useRef } from 'react'

export default function AdvancedControls({
  search,
  onSearch,
  difficulty,
  onDifficulty,
  sortBy,
  onSort,
  showFavorites,
  onShowFavorites,
  onExport,
  onImport,
  onReset
}) {
  const fileRef = useRef(null)

  function handleImportClick() {
    fileRef.current?.click()
  }

  function handleFile(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result)
        onImport(json)
      } catch (err) {
        // ignore invalid
        alert('Invalid JSON file')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="advanced">
      <h3>Advanced</h3>
      <input
        placeholder="Search recipes"
        value={search}
        onChange={e => onSearch(e.target.value)}
      />

      <div className="row">
        <label>Difficulty</label>
        <select value={difficulty} onChange={e => onDifficulty(e.target.value)}>
          <option value="">All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <div className="row">
        <label>Sort</label>
        <select value={sortBy} onChange={e => onSort(e.target.value)}>
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className="row checkbox">
        <label>
          <input type="checkbox" checked={showFavorites} onChange={e => onShowFavorites(e.target.checked)} />
          Favorites only
        </label>
      </div>

      <div className="row buttons">
        <button type="button" onClick={() => onExport()}>Export JSON</button>
        <button type="button" onClick={handleImportClick}>Import JSON</button>
        <input ref={fileRef} type="file" accept="application/json" onChange={handleFile} style={{display:'none'}} />
      </div>

      <div className="row">
        <button className="reset" type="button" onClick={() => { if (confirm('Reset to default recipes? This will overwrite current recipes.')) onReset() }}>Reset to defaults</button>
      </div>
    </div>
  )
}
