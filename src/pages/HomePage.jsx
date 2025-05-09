import React from 'react'
import Header from '../components/Header'
import About from '../components/About'
import Products from '../components/Products'
import Reviews from '../components/Reviews'
import Contact from '../components/Contact'
import { ToastContainer } from 'react-toastify';
import Footer from '../components/footer'

const HomePage = () => {
  return (
    <div>
        <ToastContainer/>
        <Header/>
        <About/>
        <Products/>
        <Reviews/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default HomePage
