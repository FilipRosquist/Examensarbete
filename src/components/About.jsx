import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const About = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handler for the Learn More button click
  const handleLearnMoreClick = () => {
    navigate('/about'); // Navigate to the /about route
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 200 }} 
      transition={{ duration: 1 }}  
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden' 
      id='About'
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 flex items-center gap-2">
        About
        <img src={assets.logoPanEl} alt="" className="h-[1em] w-auto" />
      </h1>
      <p className='text-gray-500 max-w-80 text-center mb-8'>
        Passionate About Solar Powered Energy, Dedicated For A Green Future
      </p>
      <div className='flex flex-col md:flex-row items-center md:items-start md:gap-20'>
        <img 
          src={assets.brand_img} 
          className='w-full sm-w-1/2 max-w-lg' 
          alt="AboutImage" 
        />
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
              <p>Different Solar Packages</p>
            </div>
            <div>
              <p className='text-4xl font-medium text-gray-800'>25+</p>
              <p>Ongoing Projects</p>
            </div>
          </div>
          <p className='my-10 max-w-lg'>
            <strong>Pan-El</strong> was founded with a clear vision: to revolutionize how people consume and produce energy.
            We believe in a world where renewable power is accessible, reliable, and affordable for everyone. Our mission is
            to harness the power of the sun to create a cleaner, more sustainable planet for future generations.
          </p>
          {/* Learn More button */}
          <button 
            onClick={handleLearnMoreClick} // On button click, navigate to /about
            className='bg-blue-800 hover:bg-blue-700 text-white px-8 py-2 rounded'
          >
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
