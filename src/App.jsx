import React from 'react'
import Header from './components/Header'
import About from './components/About'
import Products from './components/Products'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div w-full overflow-hidden>
      <ToastContainer/>
      <Header/>
      <About/>
      <Products/>
      <Reviews/>
      <Contact/>
    </div>
  )
}

export default App
