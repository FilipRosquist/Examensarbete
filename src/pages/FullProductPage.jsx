import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar2'; // Adjust the path to your Navbar component
import Footer from '../components/Footer'; // Adjust the path to your Footer component

const FullProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center">Loading products...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div>
      {/* Navbar at the top */}
      <Navbar />

      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

        {/* Wrapper with max-width of 900px */}
        <div className="max-w-[900px] mx-auto">
          {/* Grid for products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="w-full h-48 sm:h-60 md:h-72 relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-2">{product.title}</h2>
                  <p className="text-md sm:text-lg text-gray-600 mb-2">${product.price}</p>
                  <p className="text-sm sm:text-base text-gray-500 mb-4">{product.description}</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default FullProductPage;
