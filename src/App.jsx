import React from 'react'
import Header from './components/Header'
import About from './components/About'
import Products from './components/Products'
import Reviews from './components/Reviews'

const App = () => {
  return (
    <div w-full overflow-hidden>
      <Header/>
      <About/>
      <Products/>
      <Reviews/>
    </div>
  )
}

export default App
