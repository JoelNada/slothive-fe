import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import styles from './Header.module.css'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  const linkClass = ({ isActive }) => (isActive ? styles.active : undefined)

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>SlotHive</Link>
      <nav aria-label="Main navigation">
        <ul className={styles.navList}>
          <li>
            <NavLink to="/listings" className={linkClass}>Browse</NavLink>
          </li>

          {user ? (
            <>
              <li>
                <NavLink to={user.role === 'host' ? '/host-dashboard' : '/dashboard'} className={linkClass}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <a href="#">My Account</a>
              </li>
              <li className={styles.pillItem}>
                <button type="button" onClick={handleLogout} className={styles.logoutButton}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/host-dashboard" className={linkClass}>Become a Host</NavLink>
              </li>
              <li>
                <NavLink to="/login" className={linkClass}>Log In</NavLink>
              </li>
              <li className={styles.pillItem}>
                <NavLink to="/signup" className={linkClass}>Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header