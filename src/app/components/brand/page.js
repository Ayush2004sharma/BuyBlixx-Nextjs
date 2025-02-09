"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const brandLogos = [
  { src: "apple.png", link: "https://www.apple.com" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", link: "https://www.nike.com" }, 
  { src: "adidas.png", link: "https://www.adidas.com" }, 
  { src: "samsung.png", link: "https://www.samsung.com" }, 
  { src: "sony.png", link: "https://www.sony.com" },
  { src: "gucci.png", link: "https://www.gucci.com" }, 
  { src: "asus.png", link: "https://www.asus.com" }, 
  { src: "vivo.png", link: "https://www.vivo.com" }, 
];

const BrandLogos = () => {
  const marqueeRef = useRef(null);
  let animation = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    animation.current = gsap.to(marquee, {
      x: "-50%", 
      ease: "linear",
      duration: 20, // Slower speed
      repeat: -1,
    });
  }, []);

  const handleMouseEnter = () => {
    animation.current.pause();
  };

  const handleMouseLeave = () => {
    animation.current.resume();
  };

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-lg py-6">
      <h2 className="text-3xl font-extrabold text-gray-800 uppercase tracking-wide text-center mb-6">
        Featured Brands
      </h2>
      <div 
        className="relative flex w-full overflow-hidden items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={marqueeRef} className="flex space-x-10 w-max">
          {[...brandLogos, ...brandLogos].map((logo, index) => (
            <div key={index} className="w-32 h-32 flex justify-center items-center transition-transform duration-300 hover:scale-125"> {/* Smaller icons, bigger on hover */}
              <a href={logo.link} target="_blank" rel="noopener noreferrer">
                <img src={logo.src} alt="Brand Logo" className="w-32 h-32 object-contain" /> {/* Smaller icons */}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandLogos;
