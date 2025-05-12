import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar2'; // Ensure this path is correct
import Footer from '../components/Footer'; // Ensure this path is correct

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
                        className="px-2 py-1 bg-gray-300 rounded-full"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-300 rounded-full"
                      >
                        +
                      </button>
                      <span className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</span> {/* Format quantity price */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800"
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
                    className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
                    onClick={() => alert('Proceed to checkout functionality to be implemented')}
                  >
                    Checkout
                  </button>
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
