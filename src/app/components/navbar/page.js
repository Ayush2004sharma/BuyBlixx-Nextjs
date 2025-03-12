"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  FaBars,
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaSearch,
} from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { FaWallet } from "react-icons/fa6";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const profileDropdownRef = useRef(null);
  const profileIconRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Reset state on route change
  useEffect(() => {
    setIsOpen(false); // Close mobile menu
    setIsProfileOpen(false); // Close profile dropdown
  }, [pathname]);

  const handleNavigation = (path) => {
    router.push(path);
  };

  // GSAP animations
  useEffect(() => {
    // Mobile menu slide-in animation
    if (isOpen) {
      gsap.fromTo(mobileMenuRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.3 });
    } else {
      gsap.to(mobileMenuRef.current, { opacity: 0, x: 50, duration: 0.3 });
    }

    // Profile dropdown slide-in animation
    if (isProfileOpen) {
      gsap.fromTo(profileDropdownRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });
    } else {
      gsap.to(profileDropdownRef.current, { opacity: 0, y: -20, duration: 0.3 });
    }
  }, [isOpen, isProfileOpen]);

  // Handle search icon click: focus on search input
  const handleSearchClick = () => {
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  // Close dropdown when clicking outside of the profile dropdown
  const handleClickOutside = (e) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(e.target) &&
      !profileIconRef.current.contains(e.target)
    ) {
      setIsProfileOpen(false); // Close the dropdown if clicked outside
    }
  };

  // Add event listener for clicks outside on mount and remove on unmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Prevent default behavior on profile icon click to stop page reload
  const handleProfileClick = (e) => {
    e.preventDefault();
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLinkClickActive = (link) => {
    setActiveLink(link); // Set active link

    // Add GSAP underline animation
    gsap.fromTo(
      `.${link}-underline`,
      { width: 0 },
      { width: "100%", duration: 0.8, ease: "elastic.out(1, 0.3)" }
    );
  };

  return (
    <div>
      <nav className="bg-white p-4 shadow-2xl h-20 fixed w-full top-0 z-50">
        <div className="container mx-auto flex items-center space-x-4">
          <div className="w-2/6 flex justify-center">
            <span
              className="text-black text-xl font-bold cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              Buyblixx
            </span>
          </div>
          <div className="flex flex-grow justify-between items-center w-3/6">
            <ul className="hidden lg:flex space-x-4">
              <li
                onClick={() => {
                  handleNavigation("/");
                  handleLinkClickActive("home");
                }}
                className={`text-black text-lg cursor-pointer hover:text-gray-400 transition duration-300 relative ${
                  activeLink === "home" ? "font-bold underline decoration-4 " : ""
                }`}
              >
                Home
                <span className="home-underline absolute bottom-0 left-0 h-1 bg-black w-0"></span>
              </li>
              <li
                onClick={() => {
                  handleNavigation("/trend");
                  handleLinkClickActive("trend");
                }}
                className={`text-black text-lg cursor-pointer hover:text-gray-400 transition duration-300 relative ${
                  activeLink === "trend" ? "font-bold underline decoration-4 " : ""
                }`}
              >
                Trend
                <span className="trend-underline absolute bottom-0 left-0 h-1 bg-black w-0"></span>
              </li>
              <li
                onClick={() => {
                  handleNavigation("/collection");
                  handleLinkClickActive("collection");
                }}
                className={`text-black text-lg cursor-pointer hover:text-gray-400 transition duration-300 relative ${
                  activeLink === "collection" ? "font-bold underline decoration-4 " : ""
                }`}
              >
                Collection
                <span className="collection-underline absolute bottom-0 left-0 h-1 bg-black w-0"></span>
              </li>
            </ul>
            <div className="relative flex items-center w-full sm:w-48 md:w-64 lg:w-72 xl:w-80">
              <input
                type="text"
                placeholder="Search..."
                className="outline-none w-full px-4 py-2 rounded-md border-2 border-black text-black"
              />
              <FaSearch
                className="absolute right-2 text-black cursor-pointer"
                onClick={handleSearchClick}
              />
            </div>
            <div className="hidden lg:flex space-x-3 text-black items-center gap-3">
              <FaUser
                ref={profileIconRef}
                size={24}
                className="cursor-pointer hover:text-gray-400"
                onClick={handleProfileClick}
              />
              <FaWallet 
               size={24}
               id="wallet-icon"
               className="cursor-pointer hover:text-gray-400"
               onClick={() => handleNavigation("/components/Wallet")}/>
              <FaHeart
                size={24}
                id="wishlist-icon"
                className="cursor-pointer hover:text-gray-400"
                onClick={() => handleNavigation("/pages/wishlistPage")}
              />
              <FaShoppingCart
                size={24}
                className="cursor-pointer hover:text-gray-400"
                onClick={() => handleNavigation("/pages/cartPage")}
              />
            </div>
          </div>
          <div
            className="lg:hidden cursor-pointer text-black mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars size={24} />
          </div>
        </div>
      </nav>
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-20 right-0 w-2/6 bg-white text-black p-4 shadow-lg rounded-bl-lg lg:hidden z-50"
        >
          <ul className="space-y-2">
            <li
              className="text-lg cursor-pointer hover:text-gray-300 transition duration-300 border-b border-gray-300 pb-2"
              onClick={() => handleNavigation("/")}
            >
              Home
            </li>
            <li
              className="text-lg cursor-pointer hover:text-gray-300 transition duration-300 border-b border-gray-300 pb-2"
              onClick={() => handleNavigation("/components/Wallet")}
            >
              Wallet
            </li>
            <li
              className="text-lg cursor-pointer hover:text-gray-300 transition duration-300 border-b border-gray-300 pb-2"
              onClick={() => handleNavigation("/components/page")}
            >
              Login
            </li>
            <li
              className="text-lg cursor-pointer hover:text-gray-300 transition duration-300 border-b border-gray-300 pb-2"
              onClick={() => handleNavigation("/pages/wishlistPage")}
            >
              Wishlist
            </li>
            <li
              className="text-lg cursor-pointer hover:text-gray-300 transition duration-300 pb-2"
              onClick={() => handleNavigation("/pages/cartPage")}
            >
              Cart
            </li>
          </ul>
        </div>
      )}
      {isProfileOpen && (
        <div
          ref={profileDropdownRef}
          className="absolute top-20 right-0 w-1/6 bg-white text-black p-4 shadow-lg rounded-bl-lg z-50"
        >
          <ul className="space-y-2">
            <li
              className="text-lg cursor-pointer hover:text-gray-300 transition duration-300 border-b border-gray-300 pb-2"
              onClick={() => handleNavigation("/components/page")}
            >
              Login
            </li>
            <li
              className="text-lg cursor-pointer hover:text-gray-300 transition duration-300 border-b border-gray-300 pb-2"
              onClick={() => handleNavigation("/page/signup")}
            >
              Sign Up
            </li>
            <li
              className="text-lg cursor-pointer hover:text-gray-300 transition duration-300 pb-2"
              onClick={() => handleNavigation("/logout")}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
