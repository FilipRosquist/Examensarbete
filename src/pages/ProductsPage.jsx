import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            console.log("Fetching product with ID:", id);

            try {
                const res = await fetch(`http://localhost:3000/products/${id}`);
                if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
                const data = await res.json();
                console.log("Fetched product:", data);
                setProduct(data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            }
        };

        fetchProduct();
    }, [id]);

    if (error) return <p className="text-red-600 p-6">Error loading product: {error}</p>;
    if (!product) return <p className="p-6">Loading product...</p>;

    return (
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">{product.title}</h1>
    
        <img 
            src={product.image} 
            alt={product.title} 
            className="w-64 h-80 object-cover mb-6 rounded-md shadow-md mx-auto"
        />
    
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold text-blue-600">${product.price}</p>
        </div>
    
        <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
        <button className="bg-blue-600 text-white mt-5 py-2 px-4 rounded hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>

  );
};

export default ProductPage;
