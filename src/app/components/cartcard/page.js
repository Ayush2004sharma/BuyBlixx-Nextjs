"use client";
import { useCart } from "@/app/context/cartProvider";


<<<<<<< HEAD
import { useCart } from "../../context/cartProvider/page";
=======
>>>>>>> 5386cca976bc151411fdd1486945f723b9b32fd3
import { motion } from "framer-motion";
import { useCallback } from "react";
import Image from "next/image";

const CartCard = ({ product }) => {
  const { updateCartQuantity, removeFromCart } = useCart();

  if (!product || Object.keys(product).length === 0) {
    return <p className="text-gray-500">Loading...</p>;
  }

  const handleDecrease = useCallback(() => {
    if (product.quantity > 1) {
      updateCartQuantity(product.id, product.quantity - 1);
    }
  }, [product.quantity, updateCartQuantity, product.id]);

  const handleIncrease = useCallback(() => {
    updateCartQuantity(product.id, product.quantity + 1);
  }, [product.quantity, updateCartQuantity, product.id]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-4 p-4 border rounded-lg shadow-md bg-white"
    >
      {/* Product Image */}
      <Image
        src={product.image || "/fallback.jpg"}
        alt={product.name || "Product"}
        width={64}
        height={64}
        className="w-16 h-16 rounded-md object-cover"
      />

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{product.name || "Unknown Product"}</h3>
        <p className="text-gray-600">${product.price || "N/A"}</p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center">
        <button
          onClick={handleDecrease}
          disabled={product.quantity <= 1}
          className="px-2 py-1 border rounded-l bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          -
        </button>
        <span className="px-3 text-lg font-semibold">{product.quantity || 0}</span>
        <button
          onClick={handleIncrease}
          className="px-2 py-1 border rounded-r bg-gray-200 hover:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(product.id)}
        className="text-red-500 hover:text-red-700 text-xl ml-4"
      >
        ✖
      </button>
    </motion.div>
  );
};

export default CartCard;
