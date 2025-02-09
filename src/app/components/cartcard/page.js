"use client"; 

import { useCart } from "@/app/context/cartProvider";
import { motion } from "framer-motion";

const CartCard = ({ product }) => {
  const { updateCartQuantity, removeFromCart } = useCart();

  if (!product) return null; // Prevents errors during rendering

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-4 p-4 border rounded-lg shadow-md bg-white"
    >
      <img 
        src={product.image || "/placeholder.png"} 
        alt={product.name || "Product"} 
        className="w-16 h-16 rounded-md object-cover" 
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{product.name || "Unknown Product"}</h3>
        <p className="text-gray-600">${product.price ?? "N/A"}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => updateCartQuantity(product.id, product.quantity - 1)}
          disabled={product.quantity <= 1}
          className="px-2 py-1 border rounded-l bg-gray-200 hover:bg-gray-300"
        >
          -
        </button>
        <span className="px-3 text-lg font-semibold">{product.quantity}</span>
        <button
          onClick={() => updateCartQuantity(product.id, product.quantity + 1)}
          className="px-2 py-1 border rounded-r bg-gray-200 hover:bg-gray-300"
        >
          +
        </button>
      </div>
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
