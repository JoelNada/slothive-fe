import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import Listings from './pages/Listings/Listings.jsx'
import ListingDetail from './pages/ListingDetail/ListingDetail.jsx'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import HostDashboard from './pages/HostDashboard/HostDashboard.jsx'
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard.jsx'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/host-dashboard" element={<HostDashboard />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App