// src/app/[locale]/cart/page.tsx
'use client';

import CrossSell from '@/components/CrossSell';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import EngageService from '@/app/_api/engage';
import type { PersonalizationResponse } from '@/types/personalization';

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const [crossSellPosition, setCrossSellPosition] = useState<'below' | 'above'>('below');

  useEffect(() => {
    const fetchCrossSellVariant = async () => {
      try {
        const engage = await EngageService.getInstance();
        
        if (engage) {
          const response = await engage.personalize({
            channel: "WEB",
            currency: "GBP",
            pointOfSale: "SomeDemo",
            friendlyId: "kfc__cart_upsell_crosssell"
          }) as PersonalizationResponse;

          // Determine cross-sell position based on response
          if (response?.component?.position === 'above') {
            setCrossSellPosition('above');
          }
        }
      } catch (error) {
        console.error('Error fetching cart cross-sell experiment:', error);
      }
    };

    fetchCrossSellVariant();
  }, []);

  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl p-8">
        <div className="mb-8 flex items-center">
          <Link href="/" className="text-red-600 hover:text-red-700">
            ← Back to Menu
          </Link>
        </div>
        <h1 className="mb-8 text-2xl font-bold">YOUR ORDER</h1>
        <p className="py-8 text-center text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="mb-8 flex items-center">
        <Link href="/" className="text-red-600 hover:text-red-700">
          ← Back to Menu
        </Link>
      </div>

      <h1 className="mb-8 text-2xl font-bold">YOUR ORDER</h1>

      {/* Variant B shows CrossSell above items */}
      {crossSellPosition === 'above' && (
        <div className="mb-8">
          <CrossSell />
        </div>
      )}

      {items.map(item => (
        <div
          key={item.id}
          className="flex items-start justify-between border-b py-4"
        >
          <div className="flex-1">
            <h3 className="font-bold">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <div className="mt-2">
              <button
                onClick={() => removeItem(item.id)}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="ml-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                className="flex size-8 items-center justify-center rounded-full border"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="flex size-8 items-center justify-center rounded-full border"
              >
                +
              </button>
            </div>
            <div className="text-right">
              <div className="font-bold">
                £
                {(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-8 border-t pt-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">
            £
            {cartTotal.toFixed(2)}
          </span>
        </div>
        <button className="w-full rounded-lg bg-red-600 py-3 font-bold text-white hover:bg-red-700">
          Checkout
        </button>
      </div>

      {/* Control shows CrossSell below items */}
      {crossSellPosition === 'below' && (
        <div className="mt-8">
          <CrossSell />
        </div>
      )}
    </div>
  );
}