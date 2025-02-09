"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useProduct } from "@/app/context/productprovider/page";
import Sidebar from "@/app/components/sidebar/page";

const SidebarComponent = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    // Animate sidebar opening
    if (isOpen) {
      gsap.fromTo(
        sidebarRef.current,
        { x: "-100%" },
        { x: "0%", duration: 0.5, ease: "power3.out" }
      );
    }

    // Function to detect clicks outside sidebar
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(); // Close sidebar when clicking outside
      }
    };

    // Attach event listener when sidebar is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on unmount or when sidebar closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <>
      {/* Sidebar for small screens */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 sm:hidden`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* Original Navbar for large screens */}
      <div className="hidden sm:block">
        <nav className="bg-blue-500 p-4">
          <h2 className="text-white text-2xl">Original Navbar</h2>
        </nav>
      </div>
    </>
  );
};

export default SidebarComponent;
