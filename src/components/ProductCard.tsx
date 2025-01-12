'use client';

import type { Product } from '@/types';
import Image from 'next/image';

type ProductCardProps = {
  product: Product;
  onShowDetail: (product: Product) => void;
};

export default function ProductCard({ product, onShowDetail }: ProductCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
      onClick={() => onShowDetail(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onShowDetail(product);
        }
      }}
    >
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="mt-1 text-gray-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">
            £
            {product.price.toFixed(2)}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent click
            }}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            ADD TO BASKET
          </button>
        </div>
      </div>
    </div>
  );
}
