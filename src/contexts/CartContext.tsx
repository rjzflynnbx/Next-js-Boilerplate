'use client';

import type { Product } from '@/types';
import type { CartContextType, CartItem } from './types';
import React, { createContext, useContext, useState } from 'react';
import EngageService from '@/app/_api/engage';

const initialState: CartContextType = {
  items: [],
  addItem: () => { },
  removeItem: () => { },
  updateQuantity: () => { },
  totalItems: 0,
  totalPrice: 0,
};

const CartContext = createContext<CartContextType>(initialState);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = async (product: Product, quantity: number) => {

    // Track add to cart event first
    try {
      const engage = await EngageService.getInstance();
      await engage?.event('KFC_ADD_TO_CART', {
        channel: "KIOSK",
        currency: "GBP",
        pointOfSale: "SomeDemo",
        page: "product",
        language: "en"
      }, {
        productId: product.id,
        productName: product.name,
        productCategory: product.category,
        price: product.price,
        quantity: quantity,
      });
    } catch (error) {
      console.log('Engage tracking error:', error);
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find(item => item.id === product.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...currentItems, { ...product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(productId);
    } else {
      setItems(currentItems =>
        currentItems.map(item =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
