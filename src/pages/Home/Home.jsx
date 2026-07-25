import { useNavigate, Link } from 'react-router-dom'
import listings from '../../data/listings.js'
import styles from './Home.module.css'

const scheduleBlocks = [
  { time: '6:00', label: 'Open', kind: 'open' },
  { time: '7:00', label: 'Sunrise Yoga', kind: 'available' },
  { time: '8:00', label: 'Booked', kind: 'booked' },
  { time: '9:00', label: 'Photo Studio', kind: 'available' },
  { time: '10:00', label: 'Open', kind: 'open' },
  { time: '11:00', label: 'Coworking Desk', kind: 'available' },
  { time: '12:00', label: 'Booked', kind: 'booked' },
  { time: '1:00', label: 'Open', kind: 'open' },
  { time: '2:00', label: 'Cooking Class', kind: 'available' },
]

function Home() {
  const navigate = useNavigate()

  function handleSearchSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const params = new URLSearchParams()
    for (const [key, value] of formData.entries()) {
      if (value) params.set(key, value)
    }
    navigate(`/listings?${params.toString()}`)
  }

  return (
    <main>
      <section className={styles.hero}>
        <div>
          <h1>Book local experiences, by the hour.</h1>
          <p>Yoga classes, photo studios, coworking desks, cooking sessions — find a slot that fits your schedule.</p>

          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <fieldset>
              <legend>Search listings</legend>

              <label htmlFor="search-query">What are you looking for?</label>
              <input type="text" id="search-query" name="q" placeholder="e.g. yoga studio, photography" />

              <label htmlFor="search-location">Location</label>
              <input type="text" id="search-location" name="location" placeholder="City or neighborhood" />

              <label htmlFor="search-category">Category</label>
              <select id="search-category" name="category">
                <option value="">All categories</option>
                <option value="fitness">Fitness & Wellness</option>
                <option value="creative">Photography & Creative</option>
                <option value="workspace">Coworking & Workspace</option>
                <option value="learning">Classes & Tutoring</option>
              </select>

              <button type="submit">Search</button>
            </fieldset>
          </form>
        </div>

        <div className={styles.scheduleStrip} aria-hidden="true">
          <h2>Today · Downtown</h2>
          <ul>
            {scheduleBlocks.map((block) => (
              <li key={block.time}>
                <span className={styles.time}>{block.time}</span>
                <span className={`${styles.block} ${styles[block.kind]}`}>{block.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.categories} aria-labelledby="categories-heading">
        <h2 id="categories-heading">Browse by category</h2>
        <ul>
          <li><Link to="/listings?category=fitness">Fitness & Wellness</Link></li>
          <li><Link to="/listings?category=creative">Photography & Creative</Link></li>
          <li><Link to="/listings?category=workspace">Coworking & Workspace</Link></li>
          <li><Link to="/listings?category=learning">Classes & Tutoring</Link></li>
        </ul>
      </section>

      <section className={styles.featured} aria-labelledby="featured-heading">
        <h2 id="featured-heading">Featured this week</h2>

        {listings.map((listing) => (
          <article key={listing.id} className={styles.listingCard}>
            <img src={listing.image} alt={listing.imageAlt} />
            <h3><Link to={`/listings/${listing.id}`}>{listing.title}</Link></h3>
            <p className={styles.listingMeta}>{listing.category} · {listing.location}</p>
            <p className={styles.listingPrice}>{listing.price}</p>
          </article>
        ))}

        <p><Link to="/listings">See all listings →</Link></p>
      </section>

      <section className={styles.howItWorks} aria-labelledby="how-heading">
        <h2 id="how-heading">How SlotHive works</h2>
        <ol>
          <li>
            <h3>Search</h3>
            <p>Find a space or experience near you, filtered by category and availability.</p>
          </li>
          <li>
            <h3>Book a slot</h3>
            <p>Pick an open time slot and reserve it instantly — no back-and-forth messaging.</p>
          </li>
          <li>
            <h3>Show up</h3>
            <p>Get a confirmation with all the details. Payment is handled securely online.</p>
          </li>
        </ol>
      </section>

      <section className={styles.hostCta} aria-labelledby="host-cta-heading">
        <h2 id="host-cta-heading">Have a space or skill to share?</h2>
        <p>List your studio, desk, or class on SlotHive and start taking bookings today.</p>
        <Link to="/signup" className="button">Start hosting</Link>
      </section>
    </main>
  )
}

export default Home