import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // ✅ initialize navigate

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const updateCardsToShow = () => {
            if (window.innerWidth >= 1024) {
                setCardsToShow(products.length || 1);
            } else {
                setCardsToShow(1);
            }
        };

        updateCardsToShow();
        window.addEventListener('resize', updateCardsToShow);
        return () => window.removeEventListener('resize', updateCardsToShow);
    }, [products]);

    const nextProduct = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const prevProduct = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - 1 : prevIndex - 1
        );
    };

    const handleAddToCart = (product) => {
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

    if (loading) return <p className="text-center mt-20">Loading products...</p>;
    if (error) return <p className="text-center text-red-600 mt-20">Failed to load products: {error}</p>;
    if (!products.length) return <p className="text-center mt-20">No products available.</p>;

    return (
        <motion.div
            initial={{ opacity: 0, x: -200 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden'
            id='Products'
        >
            <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
                Products{' '}
                <span className='underline underline-offset-4 decoration-1 font-light'>
                    For Sale
                </span>
            </h1>

            {/* ----slider buttons---- */}
            <div className='flex justify-end items-center mb-8'>
                <button onClick={prevProduct} className='p-3 bg-gray-200 rounded mr-2' aria-label='Previous Products'>
                    <img src={assets.left_arrow} alt='Previous' />
                </button>
                <button onClick={nextProduct} className='p-3 bg-gray-200 rounded mr-2' aria-label='Next Products'>
                    <img src={assets.right_arrow} alt='Next' />
                </button>
            </div>

            {/* product slider container */}
            <div className='overflow-hidden'>
                <div
                    className='flex gap-8 transition-transform duration-500 ease-in-out'
                    style={{ transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)` }}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/product/${product.id}`)} // ✅ Go to detail page
                            className='relative flex-shrink-0 w-full sm:w-1/4 cursor-pointer group'
                        >
                            <img src={product.image} alt={product.title} className='w-full h-auto mb-14 group-hover:opacity-90 transition' />
                            <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                                <div className='inline-block bg-white w-3/4 px-4 py-2 shadow-md'>
                                    <h2 className='text-xl font-semibold text-gray-800'>{product.title}</h2>
                                    <div className='flex justify-between items-center gap-4 mt-2'>
                                        <p className='text-gray-800 text-lg font-semibold'>${product.price}</p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // ✅ Prevents parent click
                                                handleAddToCart(product);
                                            }}
                                            className="bg-white text-blue-600 border border-blue-600 py-1.5 px-4 text-sm rounded-full shadow-sm hover:bg-blue-600 hover:text-white hover:shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-300 mx-2 mb-3"

                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="bg-white text-blue-600 border-2 border-blue-600 py-3 px-10 text-lg rounded-full shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 mx-auto mt-10 block">
                    <Link to="/products" className="inline-block w-full h-full text-center">
                        More Products
                    </Link>
                </button>


            </div>
        </motion.div>
    );
};

export default Products;
