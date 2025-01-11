'use client';

import type { Product } from '@/types';
import Image from 'next/image';
import React from 'react';

type ProductDetailModalProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToOrder: (product: Product, quantity: number) => void;
};

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToOrder,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = React.useState(1);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      <div className="size-full max-w-md animate-slide-in overflow-y-auto bg-white">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
          <h2 className="text-2xl font-bold">MAKE IT YOURS</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="relative mb-4 h-64">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="rounded-lg object-cover"
              priority
            />
          </div>

          <h3 className="mb-2 text-2xl font-bold">{product.name}</h3>
          <p className="mb-4 text-gray-600">{product.description}</p>

          {product.calories && (
            <p className="mb-4 text-gray-500">{product.calories}</p>
          )}

          <div className="mt-6 border-t pt-4">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-2xl font-bold">
                £
                {product.price.toFixed(2)}
              </span>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded border"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded border"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex gap-4 border-t bg-white p-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded border border-gray-300 py-3 font-bold"
          >
            BACK TO MENU
          </button>
          <button
            type="button"
            onClick={() => {
              onAddToOrder(product, quantity);
              onClose();
            }}
            className="flex-1 rounded bg-red-600 py-3 font-bold text-white hover:bg-red-700"
          >
            ADD TO MY ORDER
          </button>
        </div>
      </div>
    </div>
  );
}
