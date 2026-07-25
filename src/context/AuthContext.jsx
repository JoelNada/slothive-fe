import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Wraps the whole app (see main.jsx) so login state is shared everywhere —
// this is what lets Header show "Dashboard / Log Out" instead of
// "Log In / Sign Up" the moment someone logs in, on any page.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  function login(userData) {
    setUser(userData)
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>')
  }
  return context
}