// A tiny in-memory mock "backend" so login/signup have something real to
// talk to before Django + PostgreSQL exist.
//
// Unlike the earlier CDN/Babel version (one static HTML page per script),
// this module is loaded once for the whole SPA and keeps its state for as
// long as the browser tab stays open — so signing up here and then logging
// in actually works now, without a full page reload. It still resets on
// refresh, since it's not a real database.

const users = [
  { fullName: 'Demo User', email: 'demo@slothive.com', password: 'password123', role: 'customer' },
]

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function login(email, password) {
  await delay(700)
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )
  if (!user) {
    throw new Error('Invalid email or password.')
  }
  return { fullName: user.fullName, email: user.email, role: user.role }
}

export async function signup({ fullName, email, password, role }) {
  await delay(700)
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase())
  if (exists) {
    throw new Error('An account with this email already exists.')
  }
  users.push({ fullName, email, password, role })
  return { fullName, email, role }
}