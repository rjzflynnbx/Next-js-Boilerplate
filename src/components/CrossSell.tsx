// src/components/CrossSell.tsx
'use client';

import { useCart } from '@/contexts/CartContext';

const pepsi = {
  id: 'drink-1',
  name: 'Pepsi',
  description: 'Ice-cold Pepsi',
  price: 1.99,
  category: 'drinks', // Added required category field
  image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/9b50dd1a-ad7b-419f-abab-04488bbfb88c.jpg',
  quantity: 1,
  calories: '150kcal',
};

export default function CrossSell() {
  const { addItem } = useCart();

  return (
    <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-start space-x-4">
        <img
          src={pepsi.image}
          alt={pepsi.name}
          className="size-24 rounded object-cover"
        />
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-bold">{pepsi.name}</h3>
          <p className="mb-2 text-sm text-gray-600">{pepsi.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold">
              £
              {pepsi.price}
            </span>
            <button
              onClick={() => addItem(pepsi, 1)}
              className="rounded-full bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
            >
              Add Drink
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
