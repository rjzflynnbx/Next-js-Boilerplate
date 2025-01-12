'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <div>
      {/* Header with back button */}
      <div className="border-b bg-white">
        <div className="container mx-auto p-4">
          <Link
            href="/en"
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
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
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Menu
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl p-4">
        <h1 className="mb-6 text-2xl font-bold">YOUR ORDER</h1>

        {items.length === 0
          ? (
              <div className="py-12 text-center">
                <p className="mb-4 text-gray-500">Your basket is empty</p>
                <Link
                  href="/en"
                  className="inline-block rounded bg-red-600 px-6 py-2 text-white"
                >
                  Start your order
                </Link>
              </div>
            )
          : (
              <>
                {items.map(item => (
                  <div key={item.id} className="mb-4 rounded-lg bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="flex size-8 items-center justify-center rounded-full border text-lg"
                          >
                            −
                          </button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex size-8 items-center justify-center rounded-full border text-lg"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            £
                            {(item.price * item.quantity).toFixed(2)}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between border-b py-2">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">
                      £
                      {totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="mt-4 w-full rounded bg-red-600 py-3 text-lg font-bold text-white"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
      </div>
    </div>
  );
}
