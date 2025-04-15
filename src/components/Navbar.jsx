import React from 'react'
import {assets} from '../assets/assets'

const Navbar = () => {
  return (
    <div className='absolute top-0 left-0 w-full z-10'>
      <div className='container mx-auto flex justify-between item-center py-4 px-6 md:px-20 lg:px-32 bg-transparent'>
        <img src={assets.logoSmall} alt="logo" />
        <ul className='hidden md:flex gap-7 text-white'>
            <a href="#Header" className='cursor-pointer hover:text-blue-800'>Home</a>
            <a href="#About" className='cursor-pointer hover:text-blue-800'>About</a>
            <a href="#Products" className='cursor-pointer hover:text-blue-800'>Products</a>
            <a href="#Contact" className='cursor-pointer hover:text-blue-800'>Contact</a>
        </ul>
        <button className='hidden md:block bg-white px-8 py-2 rounded-full'>Sign up</button>
      </div>
    </div>
  )
}

export default Navbar
