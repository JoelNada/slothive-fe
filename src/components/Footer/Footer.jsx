import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <nav aria-label="Footer navigation">
        <ul className={styles.navList}>
          <li><Link to="/listings">Browse Listings</Link></li>
          <li><Link to="/host-dashboard">Host Dashboard</Link></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Privacy</a></li>
        </ul>
      </nav>
      <p>&copy; 2026 SlotHive. All rights reserved.</p>
    </footer>
  )
}

export default Footer