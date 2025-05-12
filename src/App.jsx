import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ContactPage from './pages/ContactPage'
import ScrollToTop from './components/ScrollToTop' // <-- adjust path if needed

const App = () => {
  return (
    <div className="w-full overflow-hidden">
      <Router>
        <ScrollToTop /> {/* Automatically scrolls to top on route change */}
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
