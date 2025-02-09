"use client";

import { useEffect, useRef, useState } from "react";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/app/context/cartProvider/page"; 
import gsap from "gsap";

const WishlistCard = ({ item, onRemove, onAddToCart }) => {
  const cardRef = useRef(null);
  const [isRemoving, setIsRemoving] = useState(false);

  // ✅ Prevents build errors if item is undefined
  if (!item) return null;

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  const handleRemove = () => {
    setIsRemoving(true);
    gsap.to(cardRef.current, {
      opacity: 0,
      scale: 0,
      height: 0,
      padding: 0,
      margin: 0,
      x: 50,
      y: -50, 
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => onRemove(item.id),
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative bg-white shadow-2xl rounded-xl p-6 flex flex-col space-y-4 transition-transform hover:scale-105 border border-gray-200 overflow-hidden ${isRemoving ? 'pointer-events-none' : ''}`}
    >
      {/* Remove from Wishlist */}
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        <FaTimes size={24} />
      </button>

      {/* Product Image with Fallback */}
      <img
        src={item?.image ?? "/fallback.jpg"}
        alt={item?.name ?? "Unknown Product"}
        className="w-36 h-36 object-cover rounded-lg"
      />

      {/* Product Name and Price */}
      <div className="flex justify-between w-full">
        <h3 className="text-lg font-semibold text-gray-900">
          {item?.name ?? "Unknown Product"}
        </h3>
        <p className="text-gray-600 font-medium text-lg">
          ₹{item?.price ?? "N/A"}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => onAddToCart(item)}
        className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center space-x-2 transition"
      >
        <FaShoppingCart size={20} />
        <span>Add to Cart</span>
      </button>
    </div>
  );
};

export default WishlistCard;
