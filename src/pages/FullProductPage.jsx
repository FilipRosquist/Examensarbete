import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar2';
import Footer from '../components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FullProductPage = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) throw new Error('Failed to fetch products');
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

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priceFilter === 'under100') {
      filtered = filtered.filter((product) => product.price < 100);
    } else if (priceFilter === 'over100') {
      filtered = filtered.filter((product) => product.price >= 100);
    }

    if (sortOption === 'az') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'za') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    setDisplayedProducts(filtered);
  }, [searchQuery, priceFilter, sortOption, products]);

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-600 py-10">Error: {error}</div>;

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    toast.success('Product added to cart!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow">
        <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
          Our{' '}
          <span className='underline underline-offset-4 decoration-1 font-light'>
            Products
          </span>
        </h1>

        {/* Search, Filter, and Sort Controls */}
        <div className="max-w-[1200px] mx-auto mb-6 mt-20 flex flex-col md:flex-row md:items-center md:justify-end gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-auto"
          />

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-44"
          >
            <option value="all">All Prices</option>
            <option value="under100">Under $100</option>
            <option value="over100">$100 & Above</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-44"
          >
            <option value="default">Default Sort</option>
            <option value="az">Sort A - Z</option>
            <option value="za">Sort Z - A</option>
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

                  <button
                    onClick={() => addToCart(product)}
                    className="bg-white text-blue-600 border-2 border-blue-600 py-3 px-8 rounded-full shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 mx-4 mb-4"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default FullProductPage;
