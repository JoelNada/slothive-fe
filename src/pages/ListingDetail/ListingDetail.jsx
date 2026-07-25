import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import listings from '../../data/listings.js'
import styles from './ListingDetail.module.css'

function ListingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const listing = listings.find((l) => l.id === Number(id))

  const [selectedSlot, setSelectedSlot] = useState('')
  const [guests, setGuests] = useState(1)
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  if (!listing) {
    return (
      <main>
        <h1>Listing not found</h1>
        <p>We couldn't find that listing. <Link to="/listings">Back to all listings</Link></p>
      </main>
    )
  }

  const total = (listing.price * guests).toFixed(2)

  function handleSubmit(e) {
    e.preventDefault()
    if (!date) {
      setError('Please select a date.')
      return
    }
    if (!selectedSlot) {
      setError('Please select a time slot.')
      return
    }
    setError('')
    const params = new URLSearchParams({
      listingId: listing.id,
      date,
      slot: selectedSlot,
      guests,
    })
    navigate(`/checkout?${params.toString()}`)
  }

  return (
    <main>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/listings">Listings</Link></li>
          <li><Link to={`/listings?category=${listing.categoryValue}`}>{listing.categoryLabel}</Link></li>
          <li aria-current="page">{listing.title}</li>
        </ol>
      </nav>

      <article className={styles.detail}>
        <header className={styles.header}>
          <h1>{listing.title}</h1>
          <p className={styles.meta}>{listing.categoryLabel} · {listing.address}</p>
          <p className={styles.rating}>{listing.rating.toFixed(1)} ({listing.reviewCount} reviews)</p>
        </header>

        <section className={styles.gallery} aria-label="Photo gallery">
          <img src={listing.image} alt={listing.imageAlt} />
          <ul>
            {listing.gallery.map((img) => (
              <li key={img.src}><img src={img.src} alt={img.alt} /></li>
            ))}
          </ul>
        </section>

        <section className={styles.description} aria-labelledby="description-heading">
          <h2 id="description-heading">About this space</h2>
          <p>{listing.description}</p>
          <ul>
            {listing.amenities.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className={styles.hostInfo} aria-labelledby="host-heading">
          <h2 id="host-heading">Hosted by {listing.host.name}</h2>
          <img src={listing.host.image} alt={`Portrait of host ${listing.host.name}`} />
          <p>{listing.host.bio}</p>
        </section>

        <section className={styles.reviews} aria-labelledby="reviews-heading">
          <h2 id="reviews-heading">Reviews</h2>
          {listing.reviews.map((review) => (
            <article key={review.author} className={styles.review}>
              <h3>{review.author}</h3>
              <p className={styles.reviewRating}>{review.rating.toFixed(1)}</p>
              <p>{review.text}</p>
            </article>
          ))}
        </section>

        <aside className={styles.bookingPanel} aria-labelledby="booking-heading">
          <h2 id="booking-heading">Book a session</h2>
          <p className={styles.price}>${listing.price} <span>per {listing.priceUnit}</span></p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="booking-date">Select a date</label>
            <input
              type="date"
              id="booking-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <fieldset>
              <legend>Available time slots</legend>
              {listing.timeSlots.map((slot) => (
                <div key={slot.id} className={styles.slotOption}>
                  <input
                    type="radio"
                    id={slot.id}
                    name="time_slot"
                    value={slot.id}
                    disabled={!slot.available}
                    checked={selectedSlot === slot.id}
                    onChange={() => setSelectedSlot(slot.id)}
                  />
                  <label htmlFor={slot.id}>
                    {slot.label}{!slot.available && ' (Fully booked)'}
                  </label>
                </div>
              ))}
            </fieldset>

            <label htmlFor="guest-count">Number of guests</label>
            <input
              type="number"
              id="guest-count"
              min="1"
              max="12"
              value={guests}
              onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
              required
            />

            {error && <p className={styles.formError} role="alert">{error}</p>}

            <p className={styles.bookingSummary}>Total: <span>${total}</span></p>

            <button type="submit">Continue to checkout</button>
          </form>
        </aside>
      </article>
    </main>
  )
}

export default ListingDetail