import { Link } from 'react-router-dom';

const ProductCard = ({ product, id }) => (
  <Link to={`/product/${id}`} className="block border rounded-lg p-4 hover:shadow-lg transition">
    <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4 rounded" />
    <h2 className="text-xl font-semibold">{product.title}</h2>
    <p className="text-blue-700 font-bold mt-2">{product.price}</p>
  </Link>
);

export default ProductCard;
