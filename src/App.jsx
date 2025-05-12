import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import FullProductPage from './pages/FullProductPage'
import ContactPage from './pages/ContactPage'
import ScrollToTop from './components/ScrollToTop'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

// ✅ Replace this with your actual Stripe test publishable key
const stripePromise = loadStripe('pk_test_YourPublishableKeyHere')

const App = () => {
  return (
    <div className="w-full overflow-hidden">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<FullProductPage />} />
          <Route path="/product/:id" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          
          {/* ✅ Wrap checkout page with Stripe Elements */}
          <Route
            path="/checkout"
            element={
              <Elements stripe={stripePromise}>
                <CheckoutPage />
              </Elements>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
