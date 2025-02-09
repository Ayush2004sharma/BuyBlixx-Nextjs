"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Navbar from "@/app/components/navbar/page";
import Sidebar from "@/app/components/sidebar/page";
import ProductPage from "@/app/pages/productPage/page";
import Trend from "@/app/components/trend/page";
import Footer from "@/app/components/footer/page";
import BrandLogos from "./components/brand/page";
import SidebarComponent from "./components/sidebarComponent/page";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar remains on top */}
      <div className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>

      {/* Sidebar below Navbar */}
      <div className="relative">
        {sidebarOpen && <SidebarComponent isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
      </div>

      {/* Page Content */}
      <div className="flex flex-col flex-1 pt-[80px] overflow-y-auto gap-4">
        <div className="w-full px-4 py-2 mt-4">
          <Trend />
        </div>
        <div className="w-full px-4 py-2">
          <BrandLogos />
        </div>
        <div className="block md:hidden w-full p-4 bg-gray-200 shadow-md flex items-center justify-between">
          <span className="text-lg font-bold">Filters</span>
          <button onClick={toggleSidebar} className="text-xl">
            <FiMenu />
          </button>
        </div>
        <div className="flex flex-1 gap-4 px-4 py-2">
          <div className="hidden md:block w-1/4 p-2 ">
            <Sidebar />
          </div>
          <div className="w-full md:w-3/4 p-2">
            <ProductPage />
          </div>
        </div>
      </div>

      <div className="w-full py-4 text-center">
        <Footer />
      </div>
    </div>
  );
}
