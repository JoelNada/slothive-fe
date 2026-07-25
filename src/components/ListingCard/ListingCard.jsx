import { Link } from 'react-router-dom'
import styles from './ListingCard.module.css'

function ListingCard({ listing }) {
  return (
    <article className={styles.card}>
      <img src={listing.image} alt={listing.imageAlt} />
      <h3><Link to={`/listings/${listing.id}`}>{listing.title}</Link></h3>
      <p className={styles.meta}>{listing.categoryLabel} · {listing.location}</p>
      {listing.rating && (
        <p className={styles.rating}>{listing.rating.toFixed(1)} ({listing.reviewCount} reviews)</p>
      )}
      <p className={styles.price}>From ${listing.price} / {listing.priceUnit}</p>
    </article>
  )
}

export default ListingCard