'use client';

import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { Plus } from 'lucide-react';

interface CrossSellProduct extends Product {
  message: string;
}

const crossSellProducts: Record<string, CrossSellProduct> = {
  'burger-1': {
    id: 'drink-1',
    name: 'Pepsi',
    description: 'Ice-cold Pepsi',
    price: 1.99,
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/9b50dd1a-ad7b-419f-abab-04488bbfb88c.jpg',
    category: 'drinks',
    calories: '150kcal',
    message: 'Make It A Meal Deal With A Pepsi'
  },
  'burger-3': {
    id: 'regular-signature-fries',
    name: 'Regular Signature Fries',
    description: 'Weve seasoned the King of all sides.',
    price: 2.19,
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/8a2d3f1c-d6f0-4276-b7b5-4ceb82eecd05.jpg',
    category: 'sides-dips',
    calories: '285kcal',
    message: 'Add Our Famous Seasoned Fries'
  },
  'vegan-1': {
    id: 'corn-cob-1-pc',
    name: 'Corn Cob: 1 pc',
    price: 1.99,
    description: 'A golden cob of delicious corn. Sweet & juicy.',
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/c2aca632-c729-4843-bd04-1feadf626f50.jpg',
    category: 'sides-dips',
    calories: '285kcal',
    message: 'Add A Sweet & Golden Corn Side'
  },
};

export default function CrossSell() {
  const { items, addItem } = useCart();
  const [crossSellProduct, setCrossSellProduct] = useState<CrossSellProduct | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      setCrossSellProduct(null);
      return;
    }

    const firstCartItem = items[0];

    if (firstCartItem) {
      const matchedCrossSellProduct = crossSellProducts[firstCartItem.id];
      setCrossSellProduct(matchedCrossSellProduct || null);
    } else {
      setCrossSellProduct(null);
    }
  }, [items]);

  if (!crossSellProduct) return null;

  const handleAddCrossSell = () => {
    if (crossSellProduct) {
      addItem(crossSellProduct, 1);
    }
  };

  return (
    <div className="mb-4 bg-white rounded-lg shadow-sm">
      <div className="p-4">
        <h2 className="font-bold text-lg mb-3">{crossSellProduct.message}</h2>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              src={crossSellProduct.image}
              alt={crossSellProduct.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">{crossSellProduct.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{crossSellProduct.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">£{crossSellProduct.price}</span>
                  {crossSellProduct.calories && (
                    <span className="text-sm text-gray-500">• {crossSellProduct.calories}</span>
                  )}
                </div>
                <button
                  onClick={handleAddCrossSell}
                  className="flex items-center gap-1.5 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}