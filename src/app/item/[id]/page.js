"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProduct } from "@/app/context/productprovider/page";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProduct();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id && products.length > 0) {
      const foundProduct = products.find((p) => p.id.toString() === id);
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (!product) {
    return <div className="text-center text-xl font-semibold mt-10">Product not found.</div>;
  }

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      setError("Please select a size.");
      return;
    }
    if (product.colors?.length > 0 && !selectedColor) {
      setError("Please select a color.");
      return;
    }
    setError(""); // Clear errors
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 border border-gray-300 rounded-lg shadow-lg bg-white mx-auto max-w-6xl" // ✅ Increased width
    >
      {/* Grid Layout for Wider Design */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left: Product Image */}
        <div>
          <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
        </div>

        {/* Right: Product Details */}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-800 uppercase">{product.name}</h2>
          <div className="mt-4 text-gray-600 text-lg">
            <p><span className="font-semibold">Category:</span> {product.category}</p>
            <p><span className="font-semibold">Brand:</span> {product.brand}</p>
            <p className={`mt-1 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p className="mt-2 text-2xl font-semibold text-gray-800">
              ₹{product.price} <span className="line-through text-gray-500 text-lg">₹{product.originalPrice}</span> 
              <span className="text-green-600 text-lg ml-2">({product.discount} OFF)</span>
            </p>
          </div>

          {/* Ratings & Reviews */}
          <div className="mt-3 flex items-center text-lg">
            <span className="text-yellow-500 text-2xl">⭐ {product.rating?.rate}</span>
            <span className="text-gray-500 ml-3">({product.rating?.count} reviews)</span>
          </div>

          {/* Size Selection */}
          {product.sizes?.length > 0 && (
            <div className="mt-5">
              <p className="font-semibold text-lg">Select Size:</p>
              <div className="flex gap-3 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded text-lg ${selectedSize === size ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors?.length > 0 && (
            <div className="mt-5">
              <p className="font-semibold text-lg">Select Color:</p>
              <div className="flex gap-3 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${selectedColor === color ? "border-blue-500" : "border-gray-300"}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mt-6">
            <p className="font-semibold text-lg">Quantity:</p>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="px-4 py-2 bg-gray-200 rounded-lg text-xl hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-2xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 bg-gray-200 rounded-lg text-xl hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-4 text-lg">{error}</p>}

          {/* Shipping & Return Policy */}
          <div className="mt-6 text-gray-600 text-lg">
            <p><span className="font-semibold">Shipping:</span> {product.shipping}</p>
            <p><span className="font-semibold">Return Policy:</span> {product.returnPolicy}</p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-xl font-semibold hover:bg-blue-600 transition w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
