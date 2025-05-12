import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { assets } from '../assets/assets';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle email input change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handle the subscription
  const handleSubscribe = async () => {
    if (!email) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const response = await fetch('http://localhost:3000/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (response.status === 200) {
      setSuccessMessage(data.message);  // Show success message
      setEmail('');  // Clear the input field
      setErrorMessage('');  // Clear any previous error messages
    } else {
      setErrorMessage(data.message);  // Show error message
      setSuccessMessage('');  // Clear any previous success messages
    }
  };

  return (
    <div className="pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <img src={assets.logoSmall} alt="Logo" />
          <p className="text-gray-400 mt-4">
            Pan-El provides reliable, eco-friendly solar solutions to power homes and businesses with sustainable energy, reducing costs and promoting a greener future.
          </p>
        </div>
        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <h3 className="text-white text-lg font-bold mb-4">Company</h3>
          <ul className="flex flex-col gap-2 text-gray-400">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/products" className="hover:text-white">Products</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
            <Link to="/" className="hover:text-white">Privacy Policy</Link>
          </ul>
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-white text-lg font-bold mb-4">Subscribe To Our Newsletter</h3>
          <p className="text-gray-400 mb-4 max-w-80">The latest news, articles, and resources, sent to your inbox weekly.</p>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={handleEmailChange}
              className="p-2 rounded bg-gray-800 text-gray-400 border border-gray-700 focus:outline-none w-full md:w-auto"
            />
            <button
              onClick={handleSubscribe}
              className="py-2 px-4 rounded bg-blue-500 text-white"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 mt-10 text-center text-gray-500">
        Copyright 2025 © Filip Rosquist. All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
