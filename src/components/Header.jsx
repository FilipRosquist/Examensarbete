import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div
      className="min-h-screen mb-4 bg-cover bg-center w-full overflow-hidden"
      style={{ backgroundImage: "url('/header.jpg')" }}
      id="Header"
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center min-h-screen px-6 text-white">
        <h2 className="text-5xl sm:text-6xl md:text-[82px] inline-block max-w-3xl font-semibold pt-20">Explore the life with Solar Panels</h2>
        <div className="space-x-6 mt-16">
          <a href="#Products" className="border border-white px-8 py-3 rounded">Products</a>
          <a href="#Contact" className="bg-blue-800 px-8 py-3 roundede">Contact Us</a>
        </div>
      </div>
    </div>
  )
}

export default Header
