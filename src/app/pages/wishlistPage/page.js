"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useProduct } from "@/app/context/productprovider/page";
import { useCart } from "@/app/context/cartProvider/page";
import WishlistCard from "@/app/components/wishlistCard/page";
import gsap from "gsap";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useProduct();
  const { addToCart } = useCart();
  const router = useRouter();
  const itemRefs = useRef({});
  const cartButtonRef = useRef(null);

  // ✅ Animate wishlist items when the page loads
  useEffect(() => {
    if (wishlist.length > 0) {
      gsap.fromTo(
        ".wishlist-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [wishlist]);

  // ✅ Function to animate the item moving to the cart
  const handleAddToCart = (item) => {
    const itemElement = itemRefs.current[item.id];
    const cartButton = cartButtonRef.current;
  
    if (!itemElement || !cartButton) {
      addToCart({ ...item, quantity: 1 });
      return; // ❌ No more removeFromWishlist
    }
  
    const itemRect = itemElement.getBoundingClientRect();
    const cartRect = cartButton.getBoundingClientRect();
  
    const clone = itemElement.cloneNode(true);
    document.body.appendChild(clone);
    Object.assign(clone.style, {
      position: "absolute",
      zIndex: "1000",
      top: `${itemRect.top}px`,
      left: `${itemRect.left}px`,
      width: `${itemRect.width}px`,
      height: `${itemRect.height}px`,
      pointerEvents: "none",
      opacity: "1",
    });
  
    gsap.to(clone, {
      x: cartRect.left - itemRect.left,
      y: cartRect.top - itemRect.top,
      scale: 0.3,
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => {
        document.body.removeChild(clone);
        addToCart({ ...item, quantity: 1 });
  
        // ✅ Animate "Go to Cart" button glow
        gsap.fromTo(
          cartButton,
          { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,255,0.4)" },
          { scale: 1.1, boxShadow: "0px 0px 15px rgba(0,0,255,0.7)", duration: 0.4, yoyo: true, repeat: 1 }
        );
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} ref={(el) => (itemRefs.current[item.id] = el)} className="wishlist-card">
                <WishlistCard
                  item={item}
                  onRemove={removeFromWishlist}
                  onAddToCart={handleAddToCart} // ✅ Attach animation function
                />
              </div>
            ))}
          </div>

          {/* ✅ Button to navigate to Cart with Glow Effect */}
          <div className="mt-6 text-right">
            <button
              ref={cartButtonRef}
              id="go-to-cart"
              onClick={() => router.push("/pages/cartPage")}
              className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Go to Cart 🛒
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage;
