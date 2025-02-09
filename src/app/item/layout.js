"use client";

import Navbar from "../components/navbar/page";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* ✅ Navbar always stays on top */}
      <main className="flex-1 flex justify-center items-center">{children}</main> {/* ✅ Show only ItemPage */}
    </div>
  );
}
