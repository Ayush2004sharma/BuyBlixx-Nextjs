"use client";

import { useProduct } from "@/app/context/productprovider/page";
import { motion } from "framer-motion";
import { useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }) => {
  const { addToWishlist } = useProduct();
  const cardRef = useRef(null);
  const router = useRouter();

  if (!product) return <p>Loading...</p>; // ✅ Prevent crash if product is undefined

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    const wishlistIcon = document.getElementById("wishlist-icon");
    if (!wishlistIcon || !cardRef.current) return;

    const iconRect = wishlistIcon.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();
    const xMove = iconRect.left - cardRect.left;
    const yMove = iconRect.top - cardRect.top;

    const clonedCard = cardRef.current.cloneNode(true);
    document.body.appendChild(clonedCard);

    clonedCard.style.position = "fixed";
    clonedCard.style.top = `${cardRect.top}px`;
    clonedCard.style.left = `${cardRect.left}px`;
    clonedCard.style.width = `${cardRect.width}px`;
    clonedCard.style.height = `${cardRect.height}px`;
    clonedCard.style.zIndex = "1000";
    clonedCard.style.pointerEvents = "none";

    gsap.to(clonedCard, {
      x: xMove,
      y: yMove,
      scale: 0.3,
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        addToWishlist(product);
        clonedCard.remove();
      },
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="w-full sm:w-56 h-auto sm:h-80 max-w-xs m-2 cursor-pointer"
      onClick={() => router.push(`/item/${product.id}`)}
    >
      <div className="shadow-2xl border border-gray-200 rounded-2xl overflow-hidden bg-white">
        <div className="p-4 flex flex-col items-center text-center h-full">
          <motion.img
            src={product?.image ?? "/fallback-image.jpg"}
            alt={product?.name ?? "Product"}
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg mb-3"
            whileHover={{ scale: 1.1 }}
          />
          <h2 className="text-md font-bold text-gray-900 mb-2 truncate">
            {product?.name}
          </h2>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product?.description ?? "No description available"}
          </p>
          <span className="text-lg font-semibold text-blue-600 mb-3">
            ₹{product?.price ?? "N/A"}
          </span>
          <button
            onClick={handleAddToWishlist}
            className="mt-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg px-3 py-1 rounded-lg hover:from-indigo-600 hover:to-blue-500 transition-all"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
