import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>SlotHive</Link>
      <nav aria-label="Main navigation">
        <ul className={styles.navList}>
          <li>
            <NavLink to="/listings" className={({ isActive }) => (isActive ? styles.active : undefined)}>
              Browse
            </NavLink>
          </li>
          <li>
            <NavLink to="/host-dashboard" className={({ isActive }) => (isActive ? styles.active : undefined)}>
              Become a Host
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : undefined)}>
              Log In
            </NavLink>
          </li>
          <li className={styles.signupItem}>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? styles.active : undefined)}>
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header