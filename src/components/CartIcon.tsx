'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export default function CartIcon() {
  const { totalItems, totalPrice } = useCart();

  return (
    <Link
      href="/en/cart" // Updated to include locale
      className="flex items-center gap-2 px-4 py-2"
    >
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-600"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        {totalItems > 0 && (
          <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
            {totalItems}
          </span>
        )}
      </div>
      <span className="font-bold">
        £
        {totalPrice.toFixed(2)}
      </span>
    </Link>
  );
}
