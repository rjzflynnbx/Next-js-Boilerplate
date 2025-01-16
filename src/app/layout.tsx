'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import CartIcon from '@/components/CartIcon';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            {/* <header className="bg-white border-b">
              <div className="container mx-auto flex justify-end p-2 px-8">
                <CartIcon />
              </div>
            </header> */}
            <main className="flex-1">
              {children}
            </main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}