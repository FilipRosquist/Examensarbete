import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar2';
import Footer from '../components/Footer';
import { loadStripe } from '@stripe/stripe-js';
import backIcon from '../assets/back.png'; // Ensure this image exists

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCart.length === 0) {
      navigate('/cart');
    } else {
      setCartItems(savedCart);
      calculateTotalPrice(savedCart);
    }
  }, [navigate]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total.toFixed(2));
  };

  const makePayment = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    try {
      // Load Stripe.js
      const stripe = await loadStripe(
        "pk_test_51R67CyBUo41pcN8BEfthFT0xYEB9RIPEVC6Mdojthdie3aNDJyrzScR7rGDTxk4d7MKkGPtZHjOweDJYKdL19xDH00CGFzAEED"
      );

      if (!stripe) {
        alert("Stripe.js failed to load. Please try again later.");
        return;
      }

      // Prepare products payload for backend
      const products = cartItems
        .filter(item => item.id && item.quantity > 0)
        .map(item => ({
          id: Number(item.id),
          quantity: item.quantity,
        }));

      if (products.length === 0) {
        alert("No valid products in cart.");
        return;
      }

      // Call backend to create a checkout session
      const response = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ products })  // no email sent
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create Stripe session");
      }

      const session = await response.json();

      if (!session.id) {
        throw new Error("No session ID returned from backend");
      }

      // Redirect to Stripe Checkout page
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
        alert("Payment failed: " + result.error.message);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("There was an issue with checkout. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Satisfaction Guarantee */}
      <div className="bg-green-50 p-6 rounded-lg shadow text-center mb-4 mt-4">
        <h3 className="text-2xl font-bold text-green-700 mb-2">100% Satisfaction Guarantee</h3>
        <p className="text-gray-700 max-w-2xl mx-auto">
          If you're not completely satisfied with your purchase, let us know within 14 days and we’ll issue a full refund or replacement.
        </p>
      </div>

      <div className="flex-grow bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Back Button */}
          <div className="lg:col-span-3 mt-4 text-left">
            <button
              onClick={() => navigate('/cart')}
              className=" flex items-center hover:underline"
            >
              <img
                src={backIcon}
                alt="Back"
                className="w-6 h-6 mr-2"
              />
              Back to Cart
            </button>
          </div>

          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border-b">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain rounded-md"
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
            )}
          </div>

          {/* Summary & Payment */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="text-gray-700 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              <button
                onClick={makePayment}
                className="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-full shadow-md hover:bg-green-700 transition duration-300"
              >
                Complete Order
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-7xl mx-auto mt-12 text-gray-700 space-y-12">
          {/* Trust Badges */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-white p-6 rounded-lg shadow">
            <div>
              <h3 className="text-lg font-semibold mb-2">🔒 Secure Payment</h3>
              <p className="text-sm">All transactions are encrypted and processed securely via Stripe.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">🚚 Fast Shipping</h3>
              <p className="text-sm">Orders are dispatched within 24 hours with fast delivery nationwide.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">↩️ Easy Returns</h3>
              <p className="text-sm">14-day hassle-free return policy for any issues with your order.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">💬 Support 24/7</h3>
              <p className="text-sm">Our team is here around the clock to help with any questions.</p>
            </div>
          </div>

          {/* More Info or FAQs could go here */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
