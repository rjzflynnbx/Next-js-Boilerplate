'use client';

import type { Product } from '@/types';
import Image from 'next/image';

type ProductCardProps = {
  product: Product;
  onSelect: (product: Product) => void;
};

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          priority
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
            onClick={() => onSelect(product)}
            className="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
          >
            ADD TO BASKET
          </button>
        </div>
      </div>
    </div>
  );
}
