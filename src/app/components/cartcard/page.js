"use client";

import { useCart } from "@/app/context/cartProvider";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic"; // Force dynamic rendering

const CartCard = ({ product }) => {
  const { updateCartQuantity, removeFromCart } = useCart();

  // Early return if product is undefined
  if (!product) {
    return <p className="text-gray-500">Product not available.</p>;
  }

  // Destructure with fallbacks
  const {
    image = "/fallback.jpg",
    name = "Unknown Product",
    price = "N/A",
    quantity = 0,
    id,
  } = product;

  const handleDecrease = () => {
    if (quantity > 1) {
      updateCartQuantity(id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateCartQuantity(id, quantity + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-4 p-4 border rounded-lg shadow-md bg-white"
    >
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-md object-cover"
      />

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">${price}</p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center">
        <button
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className="px-2 py-1 border rounded-l bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          -
        </button>
        <span className="px-3 text-lg font-semibold">{quantity}</span>
        <button
          onClick={handleIncrease}
          className="px-2 py-1 border rounded-r bg-gray-200 hover:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(id)}
        className="text-red-500 hover:text-red-700 text-xl ml-4"
      >
        ✖
      </button>
    </motion.div>
  );
};

export default CartCard;
