import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import starIcon from '../assets/star_icon.svg';
import Navbar from '../components/Navbar2'; // Adjust the path to your Navbar component
import Footer from '../components/Footer'; // Adjust the path to your Footer component
import backIcon from '../assets/back.png'; // Import the back image

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to different pages

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <p className="text-red-600 p-6">Error loading product: {error}</p>;
  if (!product) return <p className="p-6">Loading product...</p>;

  // Function to add product to cart
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex >= 0) {
      // If the product is already in the cart, increment its quantity
      cart[existingProductIndex].quantity += 1;
    } else {
      // If the product is not in the cart, add it with quantity 1
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally, you can navigate to the Cart Page to view the cart
    // navigate('/cart');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 rounded-lg flex-grow">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')} // Navigates to the products page
          className="mb-6 flex items-center hover:underline"
        >
          <img
            src={backIcon} // Use the back.png image from your assets
            alt="Back"
            className="w-6 h-6 mr-2" // Adjust size of the back icon
          />
          Back to Products
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 h-auto rounded-md border"
          />

          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

            <div className="flex items-center mb-2">
              <img src={starIcon} alt="star" className="w-5 h-5 mr-1" />
              <span className="text-yellow-500 font-semibold mr-2">{product.rating.rate}</span>
              <span className="text-gray-600 text-sm">({product.rating.count} reviews)</span>
            </div>

            <p className="text-2xl text-blue-700 font-semibold mb-6">${product.price}</p>

            {/* Shipping and Other Details */}
            <div className="p-4 rounded-md mb-6 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Shipping & Returns</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Free shipping on orders over $50</li>
                <li>Orders are processed within 1-2 business days</li>
                <li>Estimated delivery time: 5-7 business days</li>
                <li>Return within 30 days of delivery for a full refund</li>
                <li>Please keep your receipt for easy returns</li>
                <li>International shipping options available (additional fees may apply)</li>
              </ul>
            </div>

            {/* Description */}
            <div className="p-4 rounded-md mb-6 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Product Description</h3>
              <p className="text-sm text-gray-700">{product.description}</p>
            </div>

            {/* Add to Cart Button */}
            <button onClick={() => addToCart(product)} className="bg-white text-blue-600 border-2 border-blue-600 py-3 px-8 rounded-full shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300">
              Add to Cart 
              </button>

          </div>
        </div>

        {/* Additional Product Info */}
        {(product.specifications || product.idealFor) && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
              {product.specifications && (
                <div>
                  <h3 className="font-semibold mb-2">Specifications</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.specifications.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </div>
              )}
              {product.idealFor && (
                <div>
                  <h3 className="font-semibold mb-2">Ideal For</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.idealFor.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default ProductPage;
