"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <footer ref={footerRef} className="  py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo & Copyright */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-semibold">My Brand</h2>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6 text-xl">
          <a href="#" className="hover:text-blue-400 transition duration-300">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-blue-300 transition duration-300">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-pink-400 transition duration-300">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-blue-500 transition duration-300">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
