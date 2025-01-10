'use client';

import type { Product } from '@/types';
import Layout from '@/components/Layout';
import ProductGrid from '@/components/ProductGrid';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Boneless Banquet',
    price: 9.99,
    description: '3 Mini Fillets, small Popcorn chicken, regular Signature fries & your choice of side. Plus one Original Recipe dip.',
    image: '/placeholder.jpg',
    category: 'recommended',
    calories: '840kcal',
  },
];

export default function HomePage() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">RECOMMENDED</h1>
        <p className="mt-2 text-gray-600">We've got your chicken fix right here!</p>
      </div>
      <ProductGrid
        products={mockProducts}
        onProductSelect={() => {}}
      />
    </Layout>
  );
}
