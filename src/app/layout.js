"use client";
import { ProductProvider } from "./context/productprovider/page";
 import { CartProvider } from "./context/cartProvider/page";

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
