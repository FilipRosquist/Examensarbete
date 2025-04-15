import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='min-h-screen mb-4 bg-cover bg-center flex item-center w-full overflow-hidden' style={{backgroundImage: "url('/header.jpg')"}} id='Header'>
        <Navbar/>
      
    </div>
  )
}

export default Header
