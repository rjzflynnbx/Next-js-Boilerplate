// src/components/JustForYou.tsx
'use client';

import { useCart } from '@/contexts/CartContext';
import { useEffect, useState } from 'react';

const newCustomerOrder = {
  id: 'box-2',
  name: 'Zinger Box Meal',
  price: 8.99,
  description: 'Zinger Burger plus 2 fiery Hot Wings, regular Signature fries, your choice of side & a drink.',
  image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/967a3807-f40d-432f-a8bc-32eb4021ecf1.jpg',
  category: 'box-meals',
  calories: '870kcal',
};

const frequentCustomerOrder = {
  id: 'bucket-2',
  name: 'Family Feast: 6 pc',
  price: 18.99,
  description: '6 pieces of our famous Original Recipe chicken, 4 regular Signature fries, 2 large sides & a large bottle drink.',
  image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/50cc1826-eb59-4f6a-af47-5cb23a576eac.jpg',
  category: 'sharing-buckets',
  calories: '1100kcal',
};

export default function JustForYou() {
  const { addItem } = useCart();
  const [customerId, setCustomerId] = useState<string>('regular123');

  useEffect(() => {
    const storedCustomerId = localStorage.getItem('kfcCustomerId');
    if (storedCustomerId) {
      setCustomerId(storedCustomerId);
    }
  }, []);

  const isFrequent = customerId === 'vip456';
  const order = isFrequent ? frequentCustomerOrder : newCustomerOrder;

  const handleReorder = () => {
    addItem(order, 1);
  };

  return (
    <div className="mb-8 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-4">
        <h2 className="text-2xl font-bold text-white">
          {isFrequent ? 'Welcome back, Sarah! 🌟' : 'Welcome back, John! 👋'}
        </h2>
        <p className="text-red-100">
          {isFrequent ? 'Your personal KFC menu' : 'Get started with Colonel\'s Club'}
        </p>
      </div>
      
      <div className="bg-white p-6 shadow-sm">
        {/* Stamps Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold">Colonel's Club Rewards</p>
            <span className="text-sm text-red-600 font-medium">
              {isFrequent ? '12/14 Stamps' : '2/7 Stamps'}
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-gray-100 rounded-full mb-3">
            <div 
              className="h-full bg-red-600 rounded-full" 
              style={{ width: isFrequent ? '85.7%' : '28.5%' }}
            ></div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            {[...Array(isFrequent ? 14 : 7)].map((_, i) => (
              <div 
                key={i}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transform transition-transform hover:scale-110
                  ${(isFrequent && i < 12) || (!isFrequent && i < 2) ? 'bg-red-600 border-red-600 text-white' : 'border-gray-300'}`}
              >
                {(isFrequent && i < 12) || (!isFrequent && i < 2) ? '✓' : ''}
              </div>
            ))}
          </div>
          <p className="text-red-600 font-medium">
            {isFrequent 
              ? 'Just 2 more stamps for FREE Family Feast!' 
              : 'Collect stamps with every order!'}
          </p>
        </div>

        {/* Order Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold">{isFrequent ? 'Your Thursday Family Feast' : 'Our Most Popular Meal'}</p>
            {isFrequent && 
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                Ordered every Thursday for 3 months
              </span>
            }
          </div>
          
          <div className="flex items-start gap-6 bg-gray-50 p-4 rounded-lg">
            <img
              src={order.image}
              alt={order.name}
              className="w-24 h-24 rounded-lg object-cover shadow-sm hover:shadow-md transition-shadow"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{order.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{order.description}</p>
                  <p className="font-bold">£{order.price}</p>
                </div>
                <button
                  onClick={handleReorder}
                  className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transform transition-transform hover:scale-105"
                >
                  {isFrequent ? 'Order Again' : 'Add to Order'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}