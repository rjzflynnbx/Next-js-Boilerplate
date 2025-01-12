'use client';

import CartIcon from '@/components/CartIcon';
import { CartProvider } from '@/contexts/CartContext';
import { Inter } from 'next/font/google';
import './globals.css';

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
          <div className="flex min-h-screen flex-col">
            <header className="border-b bg-white">
              <div className="container mx-auto flex justify-end p-2">
                <CartIcon />
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
