'use client';

import type { Product } from '@/types';
import Layout from '@/components/Layout';
import ProductDetailModal from '@/components/ProductDetailModal';
import ProductGrid from '@/components/ProductGrid';
import { useRef, useState } from 'react';

const categories = [
  { id: 'recommended', name: 'RECOMMENDED' },
  { id: 'sharing-buckets', name: 'SHARING BUCKETS' },
  { id: 'box-meals', name: 'BOX MEALS' },
  { id: 'burgers', name: 'BURGERS' },
  { id: 'vegan', name: 'VEGAN' },
  { id: 'buckets-for-one', name: 'BUCKETS FOR ONE' },
  { id: 'twister-wraps', name: 'TWISTER WRAPS' },
  { id: 'riceboxes', name: 'RICEBOXES & SALADS' },
  { id: 'kentucky-savers', name: 'KENTUCKY SAVERS' },
  { id: 'just-chicken', name: 'JUST CHICKEN' },
  { id: 'sides-dips', name: 'CLASSIC SIDES & DIPS' },
];

const mockProducts: Product[] = [
  // Recommended
  {
    id: 'rec-1',
    name: 'Boneless Banquet',
    price: 9.99,
    description: '3 Mini Fillets, small Popcorn chicken, regular Signature fries & your choice of side.',
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/a6b59690-9f73-4213-a996-f68b35f0a538.jpg',
    category: 'recommended',
  },
  // Sharing Buckets
  {
    id: 'bucket-1',
    name: 'Bargain Bucket: 6 PC',
    price: 14.99,
    description: '6 pieces of our famous Original Recipe chicken with 4 regular Signature fries.',
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/2b0cfd1a-1290-44db-9540-e50916bc7a87.jpg',
    category: 'sharing-buckets',
  },
  // Box Meals
  {
    id: 'box-1',
    name: 'Mighty Box Meal',
    price: 10.49,
    description: '2 pieces of Original Recipe chicken, 2 Mini Fillets, 2 hot wings, regular fries, side and drink.',
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/a7af2847-e7b7-4d8d-8ed0-ba486dfd4d7c.jpg', // Add your working URL
    category: 'box-meals',
  },
  // Burgers
  {
    id: 'burger-1',
    name: 'Zinger Tower Burger',
    price: 8.49,
    description: 'A spicy Zinger fillet topped with hash brown, cheese & spicy Supercharger sauce.',
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/41946c60-32f1-4e36-890d-6c99ee806c1f.jpg', // Add your working URL
    category: 'burgers',
  },
  // Vegan
  {
    id: 'vegan-1',
    name: 'Original Recipe Vegan Burger',
    price: 7.99,
    description: 'Quorn fillet coated in Original Recipe coating, with fresh lettuce and vegan mayo.',
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/8c6c3895-cd43-4fe1-aba8-ad3f047e8cf4.jpg', // Add your working URL
    category: 'vegan',
  },
  // Buckets for One
  {
    id: 'single-1',
    name: 'Mighty Bucket for One',
    price: 8.99,
    description: 'Original Recipe chicken, Mini Fillets, wings, fries, drink and a side.',
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/a5558af3-3efa-478d-9b76-551686f110f9.jpg', // Add your working URL
    category: 'buckets-for-one',
  },
  // Twister Wraps
  {
    id: 'wrap-1',
    name: 'Zinger Twister Wrap',
    price: 7.49,
    description: 'Zinger fillet with lettuce and pepper mayo, wrapped in a tortilla.',
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/d6902a66-5ba8-4944-940b-428587f0882e.jpg', // Add your working URL
    category: 'twister-wraps',
  },
  // Riceboxes & Salads
  {
    id: 'rice-1',
    name: 'Original Recipe Ricebox',
    price: 5.49,
    description: 'Original Recipe chicken fillet with spicy rice, lettuce & bean salsa.',
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/83e8767c-37ee-49f1-b485-e757ad67d602.jpg', // Add your working URL
    category: 'riceboxes',
  },
  // Kentucky Savers
  {
    id: 'saver-1',
    name: 'Mini Fillet Burger',
    price: 2.49,
    description: 'Original Recipe Mini Fillet with lettuce and mayo in a soft bun.',
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/489a150b-b760-4458-969e-dd018dc37411.jpg', // Add your working URL
    category: 'kentucky-savers',
  },
  // Just Chicken
  {
    id: 'chicken-1',
    name: '2 Piece Original Recipe',
    price: 4.99,
    description: '2 pieces of our classic Original Recipe chicken.',
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/bb2948d7-e163-4cb4-b6f2-1d837e08f121.jpg', // Add your working URL
    category: 'just-chicken',
  },
  // Classic Sides & Dips
  {
    id: 'side-1',
    name: 'Regular Fries',
    price: 2.29,
    description: 'Our classic golden fries, perfect with every meal.',
    image: 'https://assets.kfcapi.com//fit-in/640x0/api/product/8a2d3f1c-d6f0-4276-b7b5-4ceb82eecd05.jpg', // Add your working URL
    category: 'sides-dips',
  },
];

export default function HomePage() {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('recommended'); // Add this

  const scrollToCategory = (categoryId: string) => {
    sectionRefs.current[categoryId]?.scrollIntoView({ behavior: 'smooth' });
    setActiveCategory(categoryId); // Update active category when scrolling
  };

  const productsByCategory = categories.map(category => ({
    ...category,
    products: mockProducts.filter(product => product.category === category.id),
  }));

  return (
    <Layout
      onCategoryClick={scrollToCategory}
      activeCategory={activeCategory} // Add this prop
    >
      <main className="p-8">
        {productsByCategory.map(({ id, name, products }) => (
          <section
            key={id}
            ref={(el) => {
              if (el) {
                sectionRefs.current[id] = el as HTMLDivElement;
              }
            }}
            className="mb-12"
          >
            <h2 className="mb-6 text-3xl font-bold">{name}</h2>
            {products.length > 0
              ? (
                  <ProductGrid
                    products={products}
                    onProductSelect={product => setSelectedProduct(product)}
                  />
                )
              : (
                  <p className="text-gray-500">No products in this category yet</p>
                )}
          </section>
        ))}
      </main>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToOrder={(_product, _quantity) => {
            setSelectedProduct(null);
          }}
        />
      )}
    </Layout>
  );
}
