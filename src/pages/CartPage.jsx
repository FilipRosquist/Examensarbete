import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar2'; // Ensure this path is correct
import Footer from '../components/Footer'; // Ensure this path is correct
import backIcon from '../assets/back.png'; // Make sure you have the back.png image in your assets folder

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Load cart items from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
    calculateTotalPrice(savedCart);
  }, []);

  // Calculate total price
  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total.toFixed(2)); // Format the total price to 2 decimal places
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart);
  };

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="lg:col-span-3 bg-gray-100 pt-10 pl-[80px] text-left">
        <button
          onClick={() => navigate('/products')}
          className="mb-6 flex items-center hover:underline"
        >
          <img
            src={backIcon} // Use the back.png image from your assets
            alt="Back"
            className="w-6 h-6 mr-2" // Adjust size of the back icon
          />
          Back to Products
        </button>
      </div>

      <div className="flex-grow flex justify-center items-center bg-gray-100 p-6">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <p className="text-center">
              Your cart is empty. <Link to="/products" className="text-blue-600">Browse products</Link>.
            </p>
          ) : (
            <div>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border-b">
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-contain rounded-md"
                    />
                    <div className="flex-1 ml-4">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p> {/* Format item price */}
                    </div>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300 ease-in-out"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300 ease-in-out"
                      >
                        +
                      </button>
                      <span className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</span> {/* Format quantity price */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold">Total: ${totalPrice}</h2> {/* Format total price */}
                </div>
                <div className="flex space-x-4">
                  <Link
                    to="/products"
                    className="bg-blue-600 text-white py-3 px-8 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    to="/checkout"
                    className="bg-green-600 text-white py-3 px-8 rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CartPage;
