import React, { useEffect, useState } from 'react'
import { assets, productsData } from '../assets/assets'

const Products = () => {

    const[currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(1);

    useEffect(()=>{
        const updateCardsToShow = ()=>{
            if(window.innerWidth >= 1024){
                setCardsToShow(productsData.length)
            }else{
                setCardsToShow(1)
            }
        };
            updateCardsToShow();

            window.addEventListener('resize', updateCardsToShow);
            return()=> window.removeEventListener('resize', updateCardsToShow);
        
    },[])

    const nextProduct = ()=>{
        setCurrentIndex((prevIndex) => (prevIndex + 1) % productsData.length)
    }

    const prevProduct = ()=>{
        setCurrentIndex((prevIndex) => prevIndex === 0 ? productsData.length -1 : prevIndex -1)
    }

  return (
    <div className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden' id='Products'>
        <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Products <span className='underline underline-offset-4 decoration-1 under font-light'>For Sale</span></h1>

        {/* ----slider buttons---- */}

        <div className='flex justify-end items-center mb-8'>
            <button onClick={prevProduct} className='p-3 bg-gray-200 rounded mr-2' aria-label='Previous Products'>
                <img src={assets.left_arrow} alt="Previous" />
            </button>
            <button onClick={nextProduct} className='p-3 bg-gray-200 rounded mr-2' aria-label='Next Products'>
                <img src={assets.right_arrow} alt="Next" />
            </button>
        </div>

        {/* product slider container */}
        <div className='overflow-hidden'>
            <div className='flex gap-8 transition-transform duration-500 ease-in-out' style={{transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`}}>
                {productsData.map((product, index)=>(
                    <div key={index} className='relative flex-shrink-0 w-full sm:w-1/4'>
                        <img src={product.image} alt={product.title} className='w-full h-auto mb-14'/>
                        <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                            <div className='inline-block bg-white w-3/4 px-4 py-2 shadow-md'>
                            <h2 className='text-xl font-semibold text-gray-800'>
                                {product.title}
                            </h2>
                            
                            <div className='flex justify-end items-center gap-4 mt-2'>
                                <p className='text-gray-800 text-lg font-semibold'>
                                    {product.price}
                                </p>
                                
                                <button onClick={() => handleAddToCart(product)} className='bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition'>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>


    </div>
  )
}

export default Products
