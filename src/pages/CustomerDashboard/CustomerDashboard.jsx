import { Link } from 'react-router-dom'
import styles from './CustomerDashboard.module.css'

const upcomingBookings = [
  {
    id: 1, title: 'Sunrise Yoga Studio', location: 'Downtown',
    when: 'July 14, 2026 · 7:00 AM – 8:00 AM', guests: 1,
    status: 'confirmed', image: 'https://picsum.photos/seed/yoga1/150/150',
  },
  {
    id: 4, title: 'Riverside Cooking Kitchen', location: 'Riverside',
    when: 'July 20, 2026 · 6:00 PM – 8:00 PM', guests: 2,
    status: 'pending', image: 'https://picsum.photos/seed/kitchen1/150/150',
  },
]

const pastBookings = [
  {
    id: 2, title: 'Lightbox Photo Studio', location: 'Riverside',
    when: 'June 30, 2026 · 2:00 PM – 3:00 PM', guests: 3,
    status: 'completed', image: 'https://picsum.photos/seed/studio1/150/150',
  },
  {
    id: 3, title: 'Northside Coworking Desk', location: 'Northside',
    when: 'June 22, 2026 · 9:00 AM – 5:00 PM', guests: 1,
    status: 'completed', image: 'https://picsum.photos/seed/desk1/150/150',
  },
  {
    id: 1, title: 'Sunrise Yoga Studio', location: 'Downtown',
    when: 'June 10, 2026 · 7:00 AM – 8:00 AM', guests: 1,
    status: 'cancelled', image: 'https://picsum.photos/seed/yoga1/150/150',
  },
]

function StatusBadge({ status, children }) {
  return <span className={`${styles.status} ${styles[status]}`}>{children}</span>
}

function BookingCard({ booking, past }) {
  return (
    <li className={styles.card}>
      <img src={booking.image} alt={booking.title} />
      <div>
        <h3><Link to={`/listings/${booking.id}`}>{booking.title}</Link></h3>
        <p className={styles.meta}>{booking.location}</p>
        <p className={styles.when}>{booking.when}</p>
        <p className={styles.guests}>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</p>
      </div>
      <div className={styles.actions}>
        <StatusBadge status={booking.status}>
          {booking.status === 'confirmed' && 'Confirmed'}
          {booking.status === 'pending' && 'Pending host confirmation'}
          {booking.status === 'completed' && 'Completed'}
          {booking.status === 'cancelled' && 'Cancelled'}
        </StatusBadge>
        {!past && <a href="#">View details</a>}
        {!past && <a href="#">Cancel booking</a>}
        {past && booking.status === 'completed' && <a href="#">Leave a review</a>}
        {past && <Link to={`/listings/${booking.id}`}>Book again</Link>}
      </div>
    </li>
  )
}

function CustomerDashboard() {
  return (
    <main>
      <header>
        <h1>Welcome back, Priya</h1>
        <p className={styles.subtitle}>Here's what you've got coming up.</p>
      </header>

      <section aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading">Upcoming bookings</h2>
        <ul className={styles.list}>
          {upcomingBookings.map((booking) => (
            <BookingCard key={`${booking.id}-${booking.when}`} booking={booking} />
          ))}
        </ul>
      </section>

      <section aria-labelledby="past-heading">
        <h2 id="past-heading">Past bookings</h2>
        <ul className={styles.list}>
          {pastBookings.map((booking) => (
            <BookingCard key={`${booking.id}-${booking.when}`} booking={booking} past />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default CustomerDashboard