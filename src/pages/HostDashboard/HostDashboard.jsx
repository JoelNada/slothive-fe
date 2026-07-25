import { Link } from 'react-router-dom'
import styles from './HostDashboard.module.css'

const stats = [
  { label: 'Active listings', value: '4' },
  { label: 'Upcoming bookings', value: '11' },
  { label: 'Earnings this month', value: '$1,284' },
  { label: 'Average rating', value: '4.9' },
]

const myListings = [
  { id: 1, name: 'Sunrise Yoga Studio', category: 'Fitness & Wellness', price: '$18 / session', status: 'active', upcoming: 6 },
  { id: 5, name: 'Core & Balance Pilates', category: 'Fitness & Wellness', price: '$22 / session', status: 'active', upcoming: 3 },
  { id: null, name: 'Evening Restorative Flow', category: 'Fitness & Wellness', price: '$20 / session', status: 'paused', upcoming: 0 },
  { id: null, name: 'Weekend Beginner Workshop', category: 'Fitness & Wellness', price: '$35 / session', status: 'active', upcoming: 2 },
]

const upcomingBookings = [
  { customer: 'Priya S.', listing: 'Sunrise Yoga Studio', date: 'July 14, 2026', time: '7:00 AM', guests: 1, status: 'confirmed' },
  { customer: 'Daniel K.', listing: 'Sunrise Yoga Studio', date: 'July 14, 2026', time: '9:00 AM', guests: 2, status: 'confirmed' },
  { customer: 'Amara O.', listing: 'Core & Balance Pilates', date: 'July 15, 2026', time: '5:30 PM', guests: 1, status: 'pending' },
  { customer: 'Leo M.', listing: 'Weekend Beginner Workshop', date: 'July 18, 2026', time: '10:00 AM', guests: 4, status: 'confirmed' },
]

function StatusBadge({ status }) {
  return <span className={`${styles.status} ${styles[status]}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
}

function HostDashboard() {
  return (
    <main>
      <header>
        <h1>Welcome back, Maya</h1>
        <p className={styles.subtitle}>Here's what's happening with your listings.</p>
      </header>

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading">Overview</h2>
        <ul className={styles.statGrid}>
          {stats.map((stat) => (
            <li key={stat.label}>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="listings-heading">
        <div className={styles.sectionHeader}>
          <h2 id="listings-heading">My listings</h2>
          <a href="#" className="button">+ Create new listing</a>
        </div>

        <table>
          <caption className={styles.srOnly}>List of your current listings and their status</caption>
          <thead>
            <tr>
              <th scope="col">Listing</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Upcoming bookings</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myListings.map((listing) => (
              <tr key={listing.name}>
                <th scope="row">
                  {listing.id ? <Link to={`/listings/${listing.id}`}>{listing.name}</Link> : listing.name}
                </th>
                <td>{listing.category}</td>
                <td>{listing.price}</td>
                <td><StatusBadge status={listing.status} /></td>
                <td>{listing.upcoming}</td>
                <td>
                  <a href="#">Edit</a> <a href="#">Manage slots</a> <a href="#">{listing.status === 'active' ? 'Pause' : 'Reactivate'}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section aria-labelledby="bookings-heading">
        <h2 id="bookings-heading">Upcoming bookings</h2>

        <table>
          <caption className={styles.srOnly}>Upcoming bookings across all your listings</caption>
          <thead>
            <tr>
              <th scope="col">Customer</th>
              <th scope="col">Listing</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Guests</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {upcomingBookings.map((booking, i) => (
              <tr key={i}>
                <td>{booking.customer}</td>
                <td>{booking.listing}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.guests}</td>
                <td><StatusBadge status={booking.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default HostDashboard