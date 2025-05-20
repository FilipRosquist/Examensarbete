import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logoPanEl.png';

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
      <div className="max-w-md w-full bg-white border border-red-200 rounded-lg shadow-lg p-8 text-center">
        <img
          src={logo}
          alt="Pan-El Logo"
          className="w-36 h-auto mx-auto mb-6"
        />

        <h1 className="text-3xl font-bold mb-4 text-red-700">
          Payment Cancelled
        </h1>
        <p className="text-gray-700 mb-6">
          Your payment did not go through. If this was unintentional, please try again or return to browse our products.
        </p>

        <Link
          to="/products"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
