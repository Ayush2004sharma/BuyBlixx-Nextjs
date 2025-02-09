"use client";

import { useCart } from "@/app/context/cartProvider/page";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";


const CartPage = () => {
  const { cart, updateCartQuantity, removeFromCart } = useCart();
  const [shippingMode, setShippingMode] = useState("store");



  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = shippingMode === "store" ? 0 : 9.99;
  const total = subtotal + shippingCost;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Qty</th>
                <th className="p-4">Total</th>
                <th className="p-4">Remove</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.tr
                    key={item.id}
                    className="cart-item border-b"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="p-4 flex gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                      </div>
                    </td>
                    <td className="p-4">${item.price.toFixed(2)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-4">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="p-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {/* Shipping Mode */}
          <div className="mt-6 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Choose Shipping Mode:</h2>
            <label className="flex items-center gap-4">
              <input
                type="radio"
                name="shipping"
                value="store"
                checked={shippingMode === "store"}
                onChange={() => setShippingMode("store")}
                className="form-radio"
              />
              Store Pickup (Free)
            </label>
            <label className="flex items-center gap-4">
              <input
                type="radio"
                name="shipping"
                value="delivery"
                checked={shippingMode === "delivery"}
                onChange={() => setShippingMode("delivery")}
                className="form-radio"
              />
              Delivery ($9.99)
            </label>
          </div>

          {/* Total Summary */}
          <div className="mt-6 flex justify-end">
            <div className="bg-white p-6 shadow-lg rounded-lg w-2/3">
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span>{shippingMode === "store" ? "Free" : `$9.99`}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-red-500 text-white mt-4 py-2 rounded-lg hover:bg-red-600">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
