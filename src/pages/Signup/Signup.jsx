import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../../utils/mockAuth.js'
import styles from './Signup.module.css'

function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('customer')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [serverError, setServerError] = useState('')

  function validate() {
    const next = {}
    if (!fullName.trim()) next.fullName = 'Full name is required.'
    if (!email.trim()) {
      next.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!password) {
      next.password = 'Password is required.'
    } else if (password.length < 8) {
      next.password = 'Password must be at least 8 characters.'
    }
    if (confirmPassword !== password) next.confirmPassword = "Passwords don't match."
    if (!agreeTerms) next.agreeTerms = 'You must agree to the terms to continue.'
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
      await signup({ fullName, email, password, role })
      setStatus('success')
    } catch (err) {
      setServerError(err.message)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <main>
        <section className={styles.wrap}>
          <div className={styles.formStatusSuccess}>
            <p>Account created for {fullName}! You can now log in.</p>
            <Link className="button" to="/login">Go to login</Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className={styles.wrap}>
        <h1>Create your SlotHive account</h1>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="full-name">Full name</label>
          <input
            type="text"
            id="full-name"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={errors.fullName ? styles.invalid : ''}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && <p className={styles.fieldError}>{errors.fullName}</p>}

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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? styles.invalid : ''}
            aria-invalid={!!errors.password}
          />
          {errors.password && <p className={styles.fieldError}>{errors.password}</p>}

          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? styles.invalid : ''}
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && <p className={styles.fieldError}>{errors.confirmPassword}</p>}

          <fieldset>
            <legend>I'm signing up as a...</legend>
            <input
              type="radio"
              id="role-customer"
              name="role"
              checked={role === 'customer'}
              onChange={() => setRole('customer')}
            />
            <label htmlFor="role-customer">Customer — I want to book experiences</label>

            <input
              type="radio"
              id="role-host"
              name="role"
              checked={role === 'host'}
              onChange={() => setRole('host')}
            />
            <label htmlFor="role-host">Host — I want to list a space or class</label>
          </fieldset>

          <label className={styles.checkboxLabel} htmlFor="terms">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </label>
          {errors.agreeTerms && <p className={styles.fieldError}>{errors.agreeTerms}</p>}

          {serverError && <p className={`${styles.formStatus} ${styles.formStatusError}`} role="alert">{serverError}</p>}

          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' && <span className={styles.spinner} aria-hidden="true"></span>}
            {status === 'loading' ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </section>
    </main>
  )
}

export default Signup