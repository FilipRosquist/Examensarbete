// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar2';
import Footer from '../components/Footer';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCart.length === 0) {
      navigate('/cart');
    }
    setCartItems(savedCart);
    calculateTotalPrice(savedCart);
  }, [navigate]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total.toFixed(2));
  };

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51R67CyBUo41pcN8BEfthFT0xYEB9RIPEVC6Mdojthdie3aNDJyrzScR7rGDTxk4d7MKkGPtZHjOweDJYKdL19xDH00CGFzAEED");

    const body = {
      products: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: `http://localhost:3000/images/${item.image}`
      }))
    };

    const response = await fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex justify-center items-center bg-gray-100 p-6">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border-b">
                    <img
                      src={`http://localhost:3000/images/${item.image}`}
                      className="w-32 h-32 object-contain rounded-md"
                    />
                    <div className="flex-1 ml-4">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-lg font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Total: ${totalPrice}</h2>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={makePayment}
                  className="bg-green-600 text-white py-3 px-8 rounded-full shadow-md hover:bg-green-700 transition duration-300"
                >
                  Complete Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
