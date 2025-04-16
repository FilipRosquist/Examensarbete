import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden' id='About'>
        <h1 className="text-2xl sm:text-4xl font-bold mb-2 flex items-center gap-2">About<img src={assets.logoPanEl} alt="" className="h-[1em] w-auto" /></h1>
        <p className='text-gray-500 max-w-80 text-center mb-8'>Passionate About Solar Powered Energy, Dedicated For A Green Future</p>
        <div className='flex flex-col md:flex-row items-center md:items-start md:gap-20'>
            <img src={assets.brand_img} className='w-full sm_w-1/2 max-w-lg' alt="AboutImage" />
            <div className='flex flex-col items-center md:items-start mt-10 text-gray-600'>
                <div className='grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28'>
                    <div>
                        <p className='text-4xl font-medium text-gray-800'>10+</p>
                        <p>Years of Experience</p>
                    </div>
                    <div>
                        <p className='text-4xl font-medium text-gray-800'>150+</p>
                        <p>Completed Installations</p>
                    </div>
                    <div>
                        <p className='text-4xl font-medium text-gray-800'>5+</p>
                        <p>Dif. Solar Packages</p>
                    </div>
                    <div>
                        <p className='text-4xl font-medium text-gray-800'>25+</p>
                        <p>Ongoing Projects</p>
                    </div>
                </div>
                <p className='my-10 max-w-lg'>Pan-El is a forward-thinking solar panel company dedicated to sustainable energy solutions. Specializing in efficient, sleek solar installations for homes and businesses, Pan-El helps customers reduce energy costs and environmental impact. With top-tier technology and expert service, Pan-El is powering a cleaner, brighter future—one rooftop at a time.</p>
                <button className='bg-blue-800 text-white px-8 py-2 rounded'>Learn More</button>
            </div>
        </div>
      
    </div>
  )
}

export default About
