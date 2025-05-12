import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar2';
import Footer from '../components/Footer';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCart.length === 0) {
      navigate('/cart'); // Redirect if cart is empty
    }
    setCartItems(savedCart);
    calculateTotalPrice(savedCart);
  }, [navigate]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice((total * 100).toFixed(0)); // In cents for Stripe
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setError('Stripe is not ready.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(totalPrice) }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Payment intent creation failed');
      }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
        localStorage.removeItem('cart');
        setCartItems([]);
        alert('Payment successful! Thank you for your order.');
        navigate('/'); // Redirect to homepage or success page
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Payment failed, please try again.');
    } finally {
      setLoading(false);
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
                      src={item.image}
                      alt={item.name}
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
                <h2 className="text-2xl font-semibold">Total: ${(totalPrice / 100).toFixed(2)}</h2>
              </div>

              <form onSubmit={handleSubmit} className="mt-6">
                <div className="mb-4 border p-4 rounded-md">
                  <CardElement />
                </div>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                <button
                  type="submit"
                  className="bg-green-600 text-white py-3 px-8 rounded-full shadow-md hover:bg-green-700 transition duration-300"
                  disabled={!stripe || loading}
                >
                  {loading ? 'Processing...' : 'Pay Now'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
