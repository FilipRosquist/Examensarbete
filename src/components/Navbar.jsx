import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showMobileMenu])

  return (
    <div className='top-0 left-0 w-full z-20'>
      <div className='w-full'>
        <div className='max-w-screen-2xl mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 text-black'>
          <img src={assets.logoPanEl} alt="logo" className='h-12 w-auto' />

          {/* Desktop Navigation */}
          <ul className='hidden md:flex gap-7 text-white font-medium'>
            <Link to="/home" className='hover:text-gray-300 transition'>Home</Link>
            <Link to="/about" className='hover:text-gray-300 transition'>About</Link>
            <Link to="/products" className='hover:text-gray-300 transition'>Products</Link>
            <Link to="/contact" className='hover:text-gray-300 transition'>Contact</Link>
          </ul>

          {/* Desktop Buttons */}
          <div className='hidden md:flex gap-4'>
            <Link to="/signup">
              <button className='bg-transparent text-white px-6 py-2 rounded font-semibold border-2 hover:text-gray-300 hover:border-gray-300 transition'>
                Sign up
              </button>
            </Link>
            <Link to="/login">
              <button className='bg-transparent text-white px-6 py-2 rounded font-semibold border-2 hover:text-gray-300 hover:border-gray-300 transition'>
                Log in
              </button>
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setShowMobileMenu(true)}
            src={assets.menu_icon}
            className='md:hidden w-7 cursor-pointer'
            alt="menu"
          />
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 bg-white z-30 transition-all duration-300 ${
          showMobileMenu ? 'w-full' : 'w-0 overflow-hidden'
        }`}
      >
        <div className='flex justify-end p-6'>
          <img
            onClick={() => setShowMobileMenu(false)}
            src={assets.cross_icon}
            className='w-6 cursor-pointer'
            alt="close"
          />
        </div>

        <ul className='flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium text-black'>
          <Link to="/home" onClick={() => setShowMobileMenu(false)} className='hover:text-gray-400 px-4 py-2 rounded w-full text-center'>Home</Link>
          <Link to="/about" onClick={() => setShowMobileMenu(false)} className='hover:text-gray-400 px-4 py-2 rounded w-full text-center'>About</Link>
          <Link to="/products" onClick={() => setShowMobileMenu(false)} className='hover:text-gray-400 px-4 py-2 rounded w-full text-center'>Products</Link>
          <Link to="/contact" onClick={() => setShowMobileMenu(false)} className='hover:text-gray-400 px-4 py-2 rounded w-full text-center'>Contact</Link>
        </ul>

        {/* Mobile Buttons */}
        <div className='flex flex-col items-center gap-4 mt-8 px-6'>
          <Link to="/signup" onClick={() => setShowMobileMenu(false)} className='bg-black text-white w-full max-w-[100px] py-2 rounded font-semibold hover:bg-gray-800 transition text-center'>
            Sign up
          </Link>
          <Link to="/login" onClick={() => setShowMobileMenu(false)} className='bg-transparent text-black w-full max-w-[100px] py-2 rounded font-semibold border-2 border-black hover:bg-gray-200 transition text-center'>
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
