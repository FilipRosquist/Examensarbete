import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : 'auto'
    return () => (document.body.style.overflow = 'auto')
  }, [showMobileMenu])

  return (
    <div className='top-0 left-0 w-full z-20'>
      <div className='w-full shadow-md'>
        <div className='max-w-screen-2xl mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 text-black'>

          <div className='flex-shrink-0'>
            <Link to="/home">
              <img src={assets.logoPanEl} alt="logo" className='h-12 w-auto' />
            </Link>
          </div>

          <div className='flex ml-[260px] text-black'>
            <ul className='hidden md:flex gap-7 text-black font-medium'>
              <Link to="/home" className='border-b-2 border-transparent hover:border-black transition'>
                Home
              </Link>
              <Link to="/about" className='border-b-2 border-transparent hover:border-black transition'>
                About
              </Link>
              <Link to="/products" className='border-b-2 border-transparent hover:border-black transition'>
                Products
              </Link>
              <Link to="/contact" className='border-b-2 border-transparent hover:border-black transition'>
                Contact
              </Link>
              <Link
                to="/cart"
                className='border-b-2 border-transparent hover:border-black transition flex items-center'
              >
                <img src={assets.cart_black} alt="Cart" className="w-6 h-6" />
              </Link>
            </ul>
          </div>

          <div>
            <img
              onClick={() => setShowMobileMenu(true)}
              src={assets.menu}
              className='md:hidden w-7 cursor-pointer'
              alt="menu"
            />
          </div>
        </div>
      </div>

      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 bg-white z-30 transition-all duration-300 ${showMobileMenu ? 'w-full' : 'w-0 overflow-hidden'}`}
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
          <Link
            to="/home"
            onClick={() => setShowMobileMenu(false)}
            className='inline-block border-b-2 border-transparent hover:border-black transition px-4 py-2 text-center'
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setShowMobileMenu(false)}
            className='inline-block border-b-2 border-transparent hover:border-black transition px-4 py-2 text-center'
          >
            About
          </Link>
          <Link
            to="/products"
            onClick={() => setShowMobileMenu(false)}
            className='inline-block border-b-2 border-transparent hover:border-black transition px-4 py-2 text-center'
          >
            Products
          </Link>
          <Link
            to="/contact"
            onClick={() => setShowMobileMenu(false)}
            className='inline-block border-b-2 border-transparent hover:border-black transition px-4 py-2 text-center'
          >
            Contact
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
