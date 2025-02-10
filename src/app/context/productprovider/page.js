"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: 1000,
    selectedBrands: [],
    selectedRating: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const fetchProducts = async (category = null) => {
    setLoading(true);
    try {
      const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : "https://fakestoreapi.com/products";
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function specifically for fetching by category
  const fetchProductsByCategory = (category) => {
    fetchProducts(category);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        wishlist,
        addToWishlist: (product) => {
          setWishlist((prev) =>
            !prev.some((item) => item.id === product.id) ? [...prev, product] : prev
          );
        },
        removeFromWishlist: (id) => {
          setWishlist((prev) => prev.filter((item) => item.id !== id));
        },
        toggleWishlist: (product) => {
          setWishlist((prev) =>
            prev.find((item) => item.id === product.id)
              ? prev.filter((item) => item.id !== product.id)
              : [...prev, product]
          );
        },
        filters,
        setFilters,
        fetchProductsByCategory, // Exposing fetch by category
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
