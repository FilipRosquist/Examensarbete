import React from 'react'
import { assets, reviewData } from '../assets/assets'

const Reviews = () => {
  return (
    <div className='container mx-auto py-10 lg:px-32 w-full overflow-hidden' id='Reviews'>
      <h1 className='text-2xl sm:text-4xl font font-bold mb-2 text-center'>Customer <span className='underline underline-offset-4 decoration-1 under font-light'>Reviews</span></h1>
      <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'>Some Opinions From Our Customers!</p>

      <div className='flex flex-wrap justify-center gap-8'>
        {reviewData.map((review, index)=>(
            <div key={index} className='max-w-[340px] border shadow-lg rounded px-8 py-12 text-center'>
                <img className='w-20 h-20 rounded-full mx-auto mb-4' src={review.image} alt={review.alt} />
                <h2 className='text-xl text-gray-700 font-medium'>{review.name}</h2>
                <p className='text-gray-500 mb-4 text-sm'>{review.title}</p>
                <div className='flex justify-center gap-1 text-red-500 mb-4'>
                    {Array.from({length: review.rating}, (item, index)=>(
                        <img key={index} src={assets.star_icon} alt="stars" />
                    ))}
                </div>
                <p className='text-gray-600'>{review.text}</p>
            </div>
        ))}
      </div>


    </div>
  )
}

export default Reviews
