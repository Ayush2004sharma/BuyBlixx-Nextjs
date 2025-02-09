"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { ProductProvider } from "@/app/context/productprovider/page";
import { CartProvider } from "@/app/context/cartProvider/page"; // ✅ Import CartProvider
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       
      >
        <ProductProvider>
          <CartProvider> 
            {children}
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
