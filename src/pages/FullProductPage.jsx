import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar2';
import Footer from '../components/Footer';

const FullProductPage = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'under100', 'over100'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setDisplayedProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price
    if (priceFilter === 'under100') {
      filtered = filtered.filter((product) => product.price < 100);
    } else if (priceFilter === 'over100') {
      filtered = filtered.filter((product) => product.price >= 100);
    }

    setDisplayedProducts(filtered);
  }, [searchQuery, priceFilter, products]);

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-600 py-10">Error: {error}</div>;

  return (
    <div>
      <Navbar />

      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

        {/* Search and Filter Controls */}
        <div className="max-w-[1200px] mx-auto mb-6 flex flex-col md:flex-row md:items-center md:justify-end gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 max-w-xs"
          />

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-44"
          >
            <option value="all">All Prices</option>
            <option value="under100">Under $100</option>
            <option value="over100">$100 & Above</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="max-w-[1200px] mx-auto">
          {displayedProducts.length === 0 ? (
            <p className="text-center text-gray-600">No products match your criteria.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedProducts.map((product) => (
                <div
                key={product.id}
                className="group bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
              >
                <Link to={`/product/${product.id}`}>
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
                  </div>
                </Link>
              </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FullProductPage;
