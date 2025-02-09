"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
];

const Trend = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Handle manual slide
  const goToImage = (index) => setCurrentIndex(index);
  const nextImage = () => setCurrentIndex((currentIndex + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-xl shadow-lg">
      {/* Image Display */}
      <img
        src={images[currentIndex]}
        alt="Trending"
        className="w-full h-full object-cover transition-opacity duration-1000"
      />

      {/* Left Arrow */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`h-3 w-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            } transition duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default Trend;
