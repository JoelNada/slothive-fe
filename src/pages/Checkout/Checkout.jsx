import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import listings from '../../data/listings.js'
import { processPayment } from '../../utils/mockCheckout.js'
import styles from './Checkout.module.css'

const SERVICE_FEE_RATE = 0.12

function Checkout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const listingId = Number(searchParams.get('listingId'))
  const date = searchParams.get('date')
  const slotId = searchParams.get('slot')
  const guests = Number(searchParams.get('guests')) || 1

  const listing = listings.find((l) => l.id === listingId)

  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [country, setCountry] = useState('')
  const [zip, setZip] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [serverError, setServerError] = useState('')
  const [confirmationId, setConfirmationId] = useState('')

  if (!listing || !date || !slotId) {
    return (
      <main>
        <h1>Nothing to check out</h1>
        <p>Start by choosing a time slot on a listing page. <Link to="/listings">Browse listings</Link></p>
      </main>
    )
  }

  const slot = listing.timeSlots.find((s) => s.id === slotId)
  const sessionPrice = listing.price * guests
  const serviceFee = sessionPrice * SERVICE_FEE_RATE
  const total = sessionPrice + serviceFee

  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Formats as the user types: groups digits into 4s ("4242 4242 4242 4242")
  function formatCardNumber(value) {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  // Formats as "MM / YY" while typing
  function formatExpiry(value) {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    if (digits.length <= 2) return digits
    return `${digits.slice(0, 2)} / ${digits.slice(2)}`
  }

  function validate() {
    const next = {}
    if (!cardName.trim()) next.cardName = 'Name on card is required.'
    if (cardNumber.replace(/\s/g, '').length !== 16) next.cardNumber = 'Enter a 16-digit card number.'
    if (!/^\d{2} \/ \d{2}$/.test(cardExpiry)) next.cardExpiry = 'Use MM / YY format.'
    if (!/^\d{3,4}$/.test(cardCvc)) next.cardCvc = 'Enter a valid CVC.'
    if (!country) next.country = 'Select a country.'
    if (!zip.trim()) next.zip = 'ZIP / postal code is required.'
    if (!agreeTerms) next.agreeTerms = 'You must agree to continue.'
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
      const result = await processPayment({ cardNumber })
      setConfirmationId(result.confirmationId)
      setStatus('success')
    } catch (err) {
      setServerError(err.message)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <main>
        <div className={styles.successBox}>
          <h1>Booking confirmed 🎉</h1>
          <p>Confirmation <strong>{confirmationId}</strong> — {listing.title} on {formattedDate}, {slot?.label}.</p>
          <p>A receipt would normally be emailed here. Payments aren't real yet — this simulates the flow ahead of the Stripe integration in Week 3.</p>
          <Link className="button" to="/dashboard">Go to my bookings</Link>
        </div>
      </main>
    )
  }

  return (
    <main>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to={`/listings/${listing.id}`}>{listing.title}</Link></li>
          <li aria-current="page">Checkout</li>
        </ol>
      </nav>

      <h1>Confirm and pay</h1>

      <div className={styles.layout}>
        <section aria-labelledby="summary-heading">
          <h2 id="summary-heading">Your booking</h2>

          <article className={styles.summaryCard}>
            <img src={listing.image} alt={listing.imageAlt} />
            <div>
              <h3>{listing.title}</h3>
              <p className={styles.meta}>{listing.categoryLabel} · {listing.location}</p>
              <dl>
                <div><dt>Date</dt><dd>{formattedDate}</dd></div>
                <div><dt>Time</dt><dd>{slot ? slot.label : '—'}</dd></div>
                <div><dt>Guests</dt><dd>{guests}</dd></div>
              </dl>
              <Link to={`/listings/${listing.id}`}>Change date or time</Link>
            </div>
          </article>

          <section className={styles.priceBreakdown} aria-labelledby="price-heading">
            <h2 id="price-heading">Price details</h2>
            <dl className={styles.priceList}>
              <div><dt>Session price</dt><dd>${sessionPrice.toFixed(2)}</dd></div>
              <div><dt>Service fee</dt><dd>${serviceFee.toFixed(2)}</dd></div>
              <div className={styles.priceTotal}><dt>Total</dt><dd>${total.toFixed(2)}</dd></div>
            </dl>
          </section>

          <section className={styles.policy} aria-labelledby="policy-heading">
            <h2 id="policy-heading">Cancellation policy</h2>
            <p>Free cancellation up to 24 hours before your session. After that, this booking is non-refundable.</p>
          </section>
        </section>

        <section className={styles.paymentSection} aria-labelledby="payment-heading">
          <h2 id="payment-heading">Payment method</h2>

          <form onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>Card details</legend>

              <label htmlFor="card-name">Name on card</label>
              <input
                type="text"
                id="card-name"
                autoComplete="cc-name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className={errors.cardName ? styles.invalid : ''}
              />
              {errors.cardName && <p className={styles.fieldError}>{errors.cardName}</p>}

              <label htmlFor="card-number">Card number</label>
              <input
                type="text"
                id="card-number"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 1234 1234 1234"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                className={errors.cardNumber ? styles.invalid : ''}
              />
              {errors.cardNumber && <p className={styles.fieldError}>{errors.cardNumber}</p>}
              <p className={styles.hint}>Try 4242 4242 4242 4242 for success, or 0000 0000 0000 0000 to see the decline flow.</p>

              <div className={styles.formRow}>
                <div>
                  <label htmlFor="card-expiry">Expiry date</label>
                  <input
                    type="text"
                    id="card-expiry"
                    placeholder="MM / YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                    className={errors.cardExpiry ? styles.invalid : ''}
                  />
                  {errors.cardExpiry && <p className={styles.fieldError}>{errors.cardExpiry}</p>}
                </div>
                <div>
                  <label htmlFor="card-cvc">CVC</label>
                  <input
                    type="text"
                    id="card-cvc"
                    inputMode="numeric"
                    placeholder="123"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className={errors.cardCvc ? styles.invalid : ''}
                  />
                  {errors.cardCvc && <p className={styles.fieldError}>{errors.cardCvc}</p>}
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Billing address</legend>

              <label htmlFor="billing-country">Country</label>
              <select
                id="billing-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={errors.country ? styles.invalid : ''}
              >
                <option value="">Select a country</option>
                <option value="US">United States</option>
                <option value="IN">India</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
              </select>
              {errors.country && <p className={styles.fieldError}>{errors.country}</p>}

              <label htmlFor="billing-zip">ZIP / Postal code</label>
              <input
                type="text"
                id="billing-zip"
                autoComplete="postal-code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className={errors.zip ? styles.invalid : ''}
              />
              {errors.zip && <p className={styles.fieldError}>{errors.zip}</p>}
            </fieldset>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              I agree to SlotHive's <a href="#">Terms of Service</a> and understand the cancellation policy above.
            </label>
            {errors.agreeTerms && <p className={styles.fieldError}>{errors.agreeTerms}</p>}

            {serverError && <p className={styles.formStatusError} role="alert">{serverError}</p>}

            <button type="submit" className={styles.payButton} disabled={status === 'loading'}>
              {status === 'loading' && <span className={styles.spinner} aria-hidden="true"></span>}
              {status === 'loading' ? 'Processing…' : `Pay $${total.toFixed(2)} and confirm booking`}
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}

export default Checkout