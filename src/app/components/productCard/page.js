"use client";

import { useProduct } from "@/app/context/productprovider/page";
import { motion } from "framer-motion";
import { useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProductCard = ({ product, wishlistIconRef }) => {
  const { addToWishlist } = useProduct();
  const cardRef = useRef(null);
  const router = useRouter();

  const handleAddToWishlist = (e) => {
    e.stopPropagation(); 
    if (!wishlistIconRef?.current || !cardRef.current) return;

    const iconRect = wishlistIconRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();

    const xMove = iconRect.left - cardRect.left;
    const yMove = iconRect.top - cardRect.top;

    if (document.getElementById(`cloned-${product.id}`)) return;

    const clonedCard = cardRef.current.cloneNode(true);
    clonedCard.id = `cloned-${product.id}`;
    document.body.appendChild(clonedCard);

    Object.assign(clonedCard.style, {
      position: "fixed",
      top: `${cardRect.top}px`,
      left: `${cardRect.left}px`,
      width: `${cardRect.width}px`,
      height: `${cardRect.height}px`,
      zIndex: "1000",
      pointerEvents: "none",
    });

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
          <motion.div whileHover={{ scale: 1.1 }}>
            <Image
              src={product.image}
              alt={product.name || "Product image"}
              width={100}
              height={100}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg mb-3"
            />
          </motion.div>
          <h2 className="text-md font-bold text-gray-900 mb-2 truncate">
            {product.name}
          </h2>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          <span className="text-lg font-semibold text-blue-600 mb-3">
            ₹{product.price}
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
