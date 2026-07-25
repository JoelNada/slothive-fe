import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import ComingSoon from './pages/ComingSoon/ComingSoon.jsx'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Not migrated yet — each becomes a real route + page as we go.
            See MIGRATION.md for the full old-page -> new-route map. */}
        <Route path="/listings" element={<ComingSoon title="Browse listings" />} />
        <Route path="/listings/:id" element={<ComingSoon title="Listing detail" />} />
        <Route path="/login" element={<ComingSoon title="Log in" />} />
        <Route path="/signup" element={<ComingSoon title="Sign up" />} />
        <Route path="/checkout" element={<ComingSoon title="Checkout" />} />
        <Route path="/host-dashboard" element={<ComingSoon title="Host dashboard" />} />
        <Route path="/dashboard" element={<ComingSoon title="My bookings" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App