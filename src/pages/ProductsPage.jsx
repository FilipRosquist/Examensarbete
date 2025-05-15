import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import starIcon from '../assets/star_icon.svg';
import Navbar from '../components/Navbar2';
import Footer from '../components/Footer';
import backIcon from '../assets/back.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom ImageMagnifier component
const ImageMagnifier = ({ src, width, height, zoomLevel = 2 }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { top, left } = imgRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setMagnifierPosition({ x, y });
  };

  return (
    <div
      className="relative border rounded-md overflow-hidden"
      style={{ width, height }}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src={src}
        alt="Zoom"
        className="w-full h-full object-contain" // <-- Changed here!
      />
      {showMagnifier && (
        <div
          className="absolute pointer-events-none border-2 border-gray-300 rounded-full"
          style={{
            top: `${magnifierPosition.y - 50}px`,
            left: `${magnifierPosition.x - 50}px`,
            width: '200px',
            height: '200px',
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
            backgroundPosition: `-${magnifierPosition.x * zoomLevel - 50}px -${magnifierPosition.y * zoomLevel - 50}px`,
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const addToCart = (product) => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 rounded-lg flex-grow">
        <button
          onClick={() => navigate('/products')}
          className="mb-6 flex items-center hover:underline"
        >
          <img src={backIcon} alt="Back" className="w-6 h-6 mr-2" />
          Back to Products
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <ImageMagnifier
              src={product.image}
              width={400}
              height={500}
              zoomLevel={2}
            />
          </div>

          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

            <div className="flex items-center mb-2">
              <img src={starIcon} alt="star" className="w-5 h-5 mr-1" />
              <span className="text-yellow-500 font-semibold mr-2">{product.rating.rate}</span>
              <span className="text-gray-600 text-sm">({product.rating.count} reviews)</span>
            </div>

            <p className="text-2xl text-blue-700 font-semibold mb-6">${product.price}</p>

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

            <div className="p-4 rounded-md mb-6 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Product Description</h3>
              <p className="text-sm text-gray-700">{product.description}</p>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="bg-white text-blue-600 border-2 border-blue-600 py-3 px-8 rounded-full shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Add to Cart
            </button>
          </div>
        </div>

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

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ProductPage;
