// src/components/ProductDetailModal.tsx
'use client';

import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import EngageService from '@/app/_api/engage';
import type { PersonalizationResponse } from '@/types/personalization';

// Control layout (A) - Original ordering controls
const ControlLayout = ({
  quantity,
  onQuantityChange,
  onAdd,
}: {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAdd: () => void;
}) => (
  <div className="mt-8 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="flex size-8 items-center justify-center rounded-full bg-gray-100"
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="flex size-8 items-center justify-center rounded-full bg-gray-100"
      >
        +
      </button>
    </div>
    <button
      onClick={onAdd}
      className="rounded-full bg-red-600 px-6 py-2 text-white"
    >
      ADD TO MY ORDER
    </button>
  </div>
);

// Variant layout (B) - More prominent controls
const VariantLayout = ({
  quantity,
  onQuantityChange,
  onAdd,
}: {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAdd: () => void;
}) => (
  <div className="mt-8 flex flex-col gap-4">
    <div className="flex items-center justify-center gap-6 rounded-lg bg-gray-50 p-4">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="flex size-12 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-xl font-bold"
      >
        -
      </button>
      <span className="w-8 text-center text-2xl font-bold">{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="flex size-12 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-xl font-bold"
      >
        +
      </button>
    </div>
    <button
      onClick={onAdd}
      className="w-full rounded-lg bg-red-600 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-red-700"
    >
      ADD TO MY ORDER
    </button>
  </div>
);

type Props = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToOrder?: (product: Product, quantity: number) => void; // Optional since we're not using it
};

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isVariantB, setIsVariantB] = useState(false);
  const { addItem } = useCart(); // Using the existing cart functionality

  // Tracking product view
  useEffect(() => {
    let isMounted = true;

    const trackProductView = async () => {
      if (isMounted && isOpen && product) {
        try {
          const engage = await EngageService.getInstance();
          await engage?.event('KFC_PRODUCT_VIEWED', {
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
            calories: product.calories
          });
        } catch (error) {
          console.log('Engage tracking error:', error);
        }
      }
    };

    trackProductView();

    // Cleanup function to handle unmounting
    return () => {
      isMounted = false;
    };
  }, [isOpen, product]);

  // Experiment variant fetching
  useEffect(() => {
    const fetchExperimentVariant = async () => {
      try {
        const engage = await EngageService.getInstance();
        
        if (engage) {
          const response = await engage.personalize({
            channel: "WEB",
            currency: "GBP",
            pointOfSale: "SomeDemo",
            friendlyId: "kfc__product_detail_modal_test"
          }) as PersonalizationResponse;

          // Assuming the response indicates the variant
          setIsVariantB(response?.component?.layout === 'variant-b');
        }
      } catch (error) {
        console.error('Error fetching product detail modal experiment:', error);
      }
    };

    fetchExperimentVariant();
  }, []);

  if (!isOpen) {
    return null;
  }

  const handleAddToOrder = () => {
    addItem(product, quantity); // Use the working cart functionality
    setQuantity(1);
    onClose();
  };

  const LayoutComponent = isVariantB ? VariantLayout : ControlLayout;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-lg transition-transform duration-300 ease-in-out">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
      >
        ×
      </button>

      {/* Product details */}
      <div className="h-full p-8">
        <div className="mb-8">
          <img
            src={product.image}
            alt={product.name}
            className="mb-6 h-64 w-full rounded-lg object-cover"
          />
          <h2 className="mb-2 text-2xl font-bold">{product.name}</h2>
          <p className="mb-4 text-gray-600">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">
              £
              {product.price}
            </span>
            <span className="text-gray-500">{product.calories}</span>
          </div>
        </div>

        {/* Order controls - switches between variants */}
        <LayoutComponent
          quantity={quantity}
          onQuantityChange={setQuantity}
          onAdd={handleAddToOrder}
        />
      </div>
    </div>
  );
}