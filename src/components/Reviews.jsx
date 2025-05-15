import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/reviews');
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="container mx-auto py-10 lg:px-32 w-full overflow-hidden"
      id="Reviews"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Customer <span className="underline underline-offset-4 decoration-1 font-light">Reviews</span>
      </h1>
      <p className="text-center text-gray-500 mb-12 max-w-80 mx-auto">
        Some Opinions From Our Customers!
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="max-w-[300px] border shadow-lg rounded px-8 py-12 text-center"
          >
            <img
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              src={review.image}
              alt={review.alt || `review-${index}`}
            />
            <h2 className="text-xl text-gray-700 font-medium">{review.name}</h2>
            <p className="text-gray-500 mb-4 text-sm">{review.title}</p>
            <div className="flex justify-center gap-1 text-red-500 mb-4">
              {Array.from({ length: review.rating }, (_, i) => (
                <img key={i} src={assets.star_icon} alt="star" />
              ))}
            </div>
            <p className="text-gray-600">{review.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Reviews;
