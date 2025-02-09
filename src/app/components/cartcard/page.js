"use client";  // ✅ Make it a Client Component

import { useCart } from "../../CartProvider"; // Adjust path if needed

const CartCard = () => {
  const { cart, updateCartQuantity, removeFromCart } = useCart();

  if (!cart || cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img
            src={item?.image || "/placeholder.png"} // ✅ Safe fallback for missing images
            alt={item?.title || "Product"}
          />
          <h3>{item?.title || "Unknown Product"}</h3>
          <p>${item?.price ?? "N/A"}</p>
          <input
            type="number"
            value={item?.quantity}
            min="1"
            onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value) || 1)}
          />
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default CartCard;

