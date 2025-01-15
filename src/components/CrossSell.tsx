// src/components/CrossSell.tsx
'use client';

import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import type { Product } from '@/types';

const crossSellProducts: Record<string, Product> = {
  'burger-1': {
    id: 'regular-signature-fries',
    name: 'Regular Signature Fries',
    description: 'Weve seasoned the King of all sides.',
    price: 2.19,
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/8a2d3f1c-d6f0-4276-b7b5-4ceb82eecd05.jpg',
    category: 'sides-dips',
    calories: '285kcal',
  },
  'burger-2': {
    id: 'drink-1',
    name: 'Pepsi',
    description: 'Ice-cold Pepsi',
    price: 1.99,
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/9b50dd1a-ad7b-419f-abab-04488bbfb88c.jpg',
    category: 'drinks',
    calories: '150kcal',
  },
  'vegan-1': {
    id: 'regular-signature-fries',
    name: 'Regular Signature Fries',
    description: 'Weve seasoned the King of all sides.',
    price: 2.19,
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/8a2d3f1c-d6f0-4276-b7b5-4ceb82eecd05.jpg',
    category: 'sides-dips',
    calories: '285kcal',
  },
};

export default function CrossSell() {
  const { items, addItem } = useCart();
  const [crossSellProduct, setCrossSellProduct] = useState<Product | null>(null);

  useEffect(() => {
    // If cart is empty, do nothing
    if (items.length === 0) {
      setCrossSellProduct(null);
      return;
    }

    // Get the first item in the cart
    const firstCartItem = items[0];

    // Check if firstCartItem is defined
    if (firstCartItem) {
      // Look up the cross-sell product based on the first item's ID
      const matchedCrossSellProduct = crossSellProducts[firstCartItem.id];

      setCrossSellProduct(matchedCrossSellProduct || null);
    } else {
      setCrossSellProduct(null);
    }
  }, [items]);

  // If no cross-sell product, don't render anything
  if (!crossSellProduct) return null;

  const handleAddCrossSell = () => {
    if (crossSellProduct) {
      addItem(crossSellProduct, 1);
    }
  };

  return (
    <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-start space-x-4">
        <img
          src={crossSellProduct.image}
          alt={crossSellProduct.name}
          className="size-24 rounded object-cover"
        />
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-bold">{crossSellProduct.name}</h3>
          <p className="mb-2 text-sm text-gray-600">{crossSellProduct.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold">
              £
              {crossSellProduct.price}
            </span>
            <button
              onClick={handleAddCrossSell}
              className="rounded-full bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}