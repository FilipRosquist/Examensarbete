import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logoPanEl.png'; // Make sure the path is correct

const SuccessPage = () => {
  useEffect(() => {
    // Clear cart after successful purchase
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="max-w-md w-full bg-white border border-blue-200 rounded-lg shadow-lg p-8 text-center">
        {/* Pan-El Logo */}
        <img
          src={logo}
          alt="Pan-El Logo"
          className="w-36 h-auto mx-auto mb-6"
        />

        <h1 className="text-3xl font-bold mb-4 text-blue-800">
          Thank you for your purchase!
        </h1>
        <p className="text-gray-700 mb-6">
          Your payment was successful. We appreciate your order and will begin processing it shortly.
        </p>
        <Link
          to="/home"
          className="inline-block bg-blue-800 text-white px-6 py-3 rounded hover:bg-blue-900 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
