"use client";

import ProductCard from "@/app/components/productCard/page";
import { useProduct } from "@/app/context/productprovider/page";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const ProductPage = () => {
  const { products, loading, filters } = useProduct();
  const productContainerRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (productContainerRef.current) {
      gsap.fromTo(
        productContainerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, [products]);

  // 🔥 Apply filters to products
  const filteredProducts = products.filter((product) => {
    return (
      (!filters.selectedBrands.length || filters.selectedBrands.includes(product.brand)) &&
      (!filters.selectedRating || product.rating >= filters.selectedRating) &&
      product.price <= filters.priceRange
    );
  });

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold mt-10">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-6 border-4 border-pistachio rounded-lg shadow-lg overflow-hidden bg-white relative h-[200vh] mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 uppercase tracking-wide mb-6">
        Our Products
      </h2>

      {selectedProduct ? (
        // 👉 Show Selected Product Details
        <div className="p-6 border rounded-lg shadow-lg bg-gray-100">
          <button
            onClick={() => setSelectedProduct(null)}
            className="mb-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            ⬅ Back to Products
          </button>

          <div className="flex flex-col items-center">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-48 h-48 object-cover rounded-lg" />
            <h2 className="text-2xl font-bold mt-4">{selectedProduct.name}</h2>
            <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
            <span className="text-xl font-semibold text-blue-600 mt-2">₹{selectedProduct.price}</span>
          </div>
        </div>
      ) : (
        // 👉 Show Product Grid
        <div
          ref={productContainerRef}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 overflow-y-auto h-full scrollbar-hide"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
            ))
          ) : (
            <p className="text-xl font-semibold text-gray-500">No products match your filters.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
