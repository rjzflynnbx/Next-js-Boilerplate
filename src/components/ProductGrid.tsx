'use client';

import { useEffect, useState } from 'react';  // Add these imports
import type { Product } from '@/types';
import type { FeatureFlag } from '@/types/personalization';  // Add this import
import EngageService from '@/app/_api/engage';  // Add this import
import ProductCard from './ProductCard';

type ProductGridProps = {
  products: Product[];
  onProductSelect: (product: Product) => void;
};

export default function ProductGrid({ products, onProductSelect }: ProductGridProps) {
  // Add state for feature flag
  const [caloriesFeature, setCaloriesFeature] = useState<FeatureFlag['feature']>({
    enabled: false,
    config: {
      style: 'subtle',
      position: 'below-description'
    }
  });

  // Add effect to fetch feature flag
  useEffect(() => {
    const fetchFeatureFlag = async () => {
      try {
        const engage = await EngageService.getInstance();
        
        if (engage) {
          const response = await engage.personalize({
            channel: "WEB",
            currency: "GBP",
            pointOfSale: "SomeDemo",
            friendlyId: "kfc__product_card_displaycalories"
          }) as FeatureFlag;

          setCaloriesFeature(response.feature);
        }
      } catch (error) {
        console.error('Error fetching calories feature flag:', error);
      }
    };

    fetchFeatureFlag();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onShowDetail={onProductSelect}
          caloriesFeature={caloriesFeature}  // Pass the feature flag
        />
      ))}
    </div>
  );
}