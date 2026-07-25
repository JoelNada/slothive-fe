import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import listings from '../../data/listings.js'
import ListingCard from '../../components/ListingCard/ListingCard.jsx'
import styles from './Listings.module.css'

function Listings() {
  const [searchParams, setSearchParams] = useSearchParams()

  const q = searchParams.get('q') || ''
  const location = searchParams.get('location') || ''
  const category = searchParams.get('category') || ''
  const priceMin = searchParams.get('price_min') || ''
  const priceMax = searchParams.get('price_max') || ''

  const filtered = useMemo(() => {
    return listings.filter((listing) => {
      const matchesQuery =
        !q ||
        listing.title.toLowerCase().includes(q.toLowerCase()) ||
        listing.categoryLabel.toLowerCase().includes(q.toLowerCase())
      const matchesLocation =
        !location || listing.location.toLowerCase().includes(location.toLowerCase())
      const matchesCategory = !category || listing.categoryValue === category
      const matchesMin = !priceMin || listing.price >= Number(priceMin)
      const matchesMax = !priceMax || listing.price <= Number(priceMax)
      return matchesQuery && matchesLocation && matchesCategory && matchesMin && matchesMax
    })
  }, [q, location, category, priceMin, priceMax])

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const params = new URLSearchParams()
    for (const [key, value] of formData.entries()) {
      if (value) params.set(key, value)
    }
    setSearchParams(params)
  }

  function handleReset() {
    setSearchParams({})
  }

  return (
    <main>
      <h1>Browse listings</h1>

      <section aria-labelledby="filters-heading" className={styles.filters}>
        <h2 id="filters-heading">Filter results</h2>
        <form onSubmit={handleSubmit} className={styles.filterForm}>
          <fieldset>
            <legend>Refine your search</legend>

            <label htmlFor="filter-query">Keyword</label>
            <input type="text" id="filter-query" name="q" defaultValue={q} placeholder="e.g. yoga, photography" />

            <label htmlFor="filter-location">Location</label>
            <input type="text" id="filter-location" name="location" defaultValue={location} placeholder="City or neighborhood" />

            <label htmlFor="filter-category">Category</label>
            <select id="filter-category" name="category" defaultValue={category}>
              <option value="">All categories</option>
              <option value="fitness">Fitness & Wellness</option>
              <option value="creative">Photography & Creative</option>
              <option value="workspace">Coworking & Workspace</option>
              <option value="learning">Classes & Tutoring</option>
            </select>

            <fieldset className={styles.priceRange}>
              <legend>Price range</legend>
              <div>
                <label htmlFor="price-min">Min ($)</label>
                <input type="number" id="price-min" name="price_min" defaultValue={priceMin} min="0" step="1" />
              </div>
              <div>
                <label htmlFor="price-max">Max ($)</label>
                <input type="number" id="price-max" name="price_max" defaultValue={priceMax} min="0" step="1" />
              </div>
            </fieldset>

            <div className={styles.filterActions}>
              <button type="submit">Apply filters</button>
              <button type="button" onClick={handleReset} className={styles.clearButton}>Clear</button>
            </div>
          </fieldset>
        </form>
      </section>

      <section aria-labelledby="results-heading">
        <h2 id="results-heading">{filtered.length} listing{filtered.length === 1 ? '' : 's'} found</h2>

        {filtered.length === 0 ? (
          <p className={styles.emptyState}>No listings match those filters. Try clearing a few and searching again.</p>
        ) : (
          <ul className={styles.resultsGrid}>
            {filtered.map((listing) => (
              <li key={listing.id}>
                <ListingCard listing={listing} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default Listings