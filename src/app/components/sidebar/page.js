"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useProduct } from "@/app/context/productprovider/page";

const Sidebar = () => {
  const { filters, setFilters } = useProduct();

  const headerRef = useRef(null);
  const categoryRefs = useRef([]);
  const filterRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      categoryRefs.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    );

    gsap.fromTo(
      filterRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="sidebar p-4 bg-white shadow-lg rounded-lg w-72 max-h-screen sm:max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
      {/* Sidebar Header */}
      <div ref={headerRef} className="p-4 bg-gray-200 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-black">Shop by Category</h2>
      </div>

      {/* Categories Section */}
      <div className="p-4 bg-blue-100 shadow-md rounded-md mt-4">
        <ul className="space-y-2">
          {["Clothing", "Electronics", "Home & Living", "Beauty & Health", "Gaming", "Watches"].map(
            (category, index) => (
              <li
                key={index}
                ref={(el) => (categoryRefs.current[index] = el)}
                className="cursor-pointer hover:text-blue-500 transition-all duration-300 text-black"
              >
                {category}
              </li>
            )
          )}
        </ul>
      </div>

      {/* Price Filter */}
      <div ref={(el) => (filterRefs.current[0] = el)} className="p-4 bg-yellow-100 shadow-md rounded-md mt-6">
        <h3 className="text-lg font-semibold text-black">💰 Price Range</h3>
        <input
          type="range"
          className="w-full mt-2 cursor-pointer"
          min="0"
          max="1000"
          value={filters.priceRange}
          onChange={(e) => setFilters({ ...filters, priceRange: Number(e.target.value) })}
        />
        <p className="text-sm text-black">Up to ₹{filters.priceRange}</p>
      </div>

      {/* Brands */}
      <div ref={(el) => (filterRefs.current[1] = el)} className="p-4 bg-green-100 shadow-md rounded-md mt-6">
        <h3 className="text-lg font-semibold text-black">🏷️ Brands</h3>
        <ul className="space-y-2">
          {["Nike", "Apple", "Samsung", "Adidas"].map((brand) => (
            <li key={brand} className="text-black">
              <input
                type="checkbox"
                value={brand}
                checked={filters.selectedBrands.includes(brand)}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilters({
                    ...filters,
                    selectedBrands: filters.selectedBrands.includes(value)
                      ? filters.selectedBrands.filter((b) => b !== value)
                      : [...filters.selectedBrands, value],
                  });
                }}
                className="mr-2"
              />
              {brand}
            </li>
          ))}
        </ul>
      </div>

      {/* Customer Ratings */}
      <div ref={(el) => (filterRefs.current[2] = el)} className="p-4 bg-red-100 shadow-md rounded-md mt-6">
        <h3 className="text-lg font-semibold text-black">⭐ Customer Ratings</h3>
        <ul className="space-y-2">
          {[5, 4, 3].map((rating) => (
            <li
              key={rating}
              className={`cursor-pointer text-black ${filters.selectedRating === rating ? "font-bold" : ""}`}
              onClick={() => setFilters({ ...filters, selectedRating: rating })}
            >
              {"⭐".repeat(rating)} ({rating} Stars & Up)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
