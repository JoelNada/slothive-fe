# Migration map — static site → React + Vite

All 8 pages are now real React routes. Migration from the static
`../slothive/` site is complete.

| Old static file | New route | Status |
|---|---|---|
| `index.html` | `/` | ✅ |
| `listings.html` | `/listings` | ✅ real client-side filtering via URL search params |
| `listing-detail.html` | `/listings/:id` | ✅ live time-slot selection & total, `useParams` |
| `login.html` | `/login` | ✅ mock auth, controlled inputs, validation |
| `signup.html` | `/signup` | ✅ same, plus role selection |
| `checkout.html` | `/checkout` | ✅ reads booking params from listing detail, mock payment |
| `host-dashboard.html` | `/host-dashboard` | ✅ stats, listings table, bookings table |
| `customer-dashboard.html` | `/dashboard` | ✅ upcoming/past bookings |

## What changed structurally along the way

- **Shared `ListingCard` component** (`src/components/ListingCard/`) — Home
  and Listings both render it instead of duplicating card markup.
- **`src/data/listings.js`** is now the single source of truth for all 6
  listings (description, gallery, host, reviews, time slots) — every page
  that needs listing data reads from here.
- **`src/utils/mockAuth.js`** and **`src/utils/mockCheckout.js`** are real
  ES modules loaded once for the whole app. Unlike the old CDN/Babel
  version, signing up on `/signup` and then logging in on `/login`
  actually works now, without a page reload — because it's one running
  app, not separate HTML documents. It still resets on a hard refresh,
  since there's no real database yet.
- The booking flow is fully connected end to end: pick a slot on
  `/listings/:id` → total carries into `/checkout` via URL params → mock
  payment → confirmation screen linking to `/dashboard`.

## What's still fake (by design, until the backend exists)

- No real database — `listings.js` and the dashboard data arrays are
  hardcoded.
- No real authentication or session persistence across page reloads.
- No real payment processing — `mockCheckout.js` always succeeds unless
  you enter the test decline card number (see the hint text on the
  checkout form).

## Next up (Week 2 of the original plan)

Django + PostgreSQL: real models for users, listings, time slots,
bookings, and payments, plus a REST API these pages can fetch from instead
of importing hardcoded data.