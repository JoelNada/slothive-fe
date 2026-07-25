import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../../utils/mockAuth.js'
import styles from './Login.module.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [serverError, setServerError] = useState('')
  const [user, setUser] = useState(null)

  function validate() {
    const next = {}
    if (!email.trim()) {
      next.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!password) next.password = 'Password is required.'
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setServerError('')
    setStatus('loading')
    try {
      const loggedInUser = await login(email, password)
      setUser(loggedInUser)
      setStatus('success')
    } catch (err) {
      setServerError(err.message + ' Try the demo account: demo@slothive.com / password123')
      setStatus('error')
    }
  }

  if (status === 'success' && user) {
    const dashboardHref = user.role === 'host' ? '/host-dashboard' : '/dashboard'
    return (
      <main>
        <section className={styles.wrap}>
          <div className={styles.formStatusSuccess}>
            <p>Welcome back, {user.fullName}! You're logged in.</p>
            <Link className="button" to={dashboardHref}>Go to your dashboard</Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className={styles.wrap}>
        <h1>Log in to SlotHive</h1>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? styles.invalid : ''}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className={styles.fieldError}>{errors.email}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? styles.invalid : ''}
            aria-invalid={!!errors.password}
          />
          {errors.password && <p className={styles.fieldError}>{errors.password}</p>}

          <p><a href="#">Forgot your password?</a></p>

          {serverError && <p className={`${styles.formStatus} ${styles.formStatusError}`} role="alert">{serverError}</p>}

          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' && <span className={styles.spinner} aria-hidden="true"></span>}
            {status === 'loading' ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p>New to SlotHive? <Link to="/signup">Create an account</Link></p>
      </section>
    </main>
  )
}

export default Login