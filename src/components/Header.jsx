import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'

const Header = () => {
  return (
    <div
      className="min-h-screen mb-4 bg-cover bg-center w-full overflow-hidden"
      style={{ backgroundImage: "url('/header.jpg')" }}
      id="Header"
    >
      <Navbar />
      
      <AnimatePresence>
        <motion.div 
          key="header-motion" // Add a key here to trigger motion on re-route
          initial={{ opacity: 0, y: 40 }} 
          transition={{ duration: 1.5 }} 
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: false}} // Set this to false to trigger every time the component comes into view
          className="flex flex-col items-center justify-center text-center min-h-screen px-6 text-white"
        >
          <h2 className="text-5xl sm:text-6xl md:text-[82px] inline-block max-w-3xl font-semibold pt-20">Explore the life with Solar Panels</h2>
          <div className="space-x-6 mt-16">
            <Link to="/products" className="border border-white hover:text-gray-300 hover:border-gray-300 px-8 py-3 rounded">
            Products 
            </Link>
            <a href="#Contact" className="bg-blue-800 hover:bg-blue-600 px-8 py-3 roundede">Contact Us</a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Header
