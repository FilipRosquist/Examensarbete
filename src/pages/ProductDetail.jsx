import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProduct(data[id]))
      .catch(console.error);
  }, [id]);

  if (!product) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded mb-6" />
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-xl text-blue-700 font-semibold mb-4">{product.price}</p>
      <p className="text-gray-700">Product description goes here.</p>
    </div>
  );
};

export default ProductDetail;
