'use client';

import type { Product } from '@/types';
import Layout from '@/components/Layout';
import ProductDetailModal from '@/components/ProductDetailModal';
import ProductGrid from '@/components/ProductGrid';
import { useEffect, useRef, useState } from 'react';
import { getMenuData } from '@/utils/getData';
import EngageService from '../_api/engage';

export default function HomePage() {
  // Move ALL hooks to the top
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [menuData, setMenuData] = useState<{
    categories: { id: string; name: string }[];
    products: Product[];
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState('recommended');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Send page view
    const sendPageView = async () => {
      
        const engage = await EngageService.getInstance();
        await engage?.pageView({
          channel: "WEB",
          currency: "GBP",
          pointOfSale: "SomeDemo",
          page: "home",
          language: "en"
        });
        // console.log('View event sent:', view);
      
    };
    sendPageView();

    // Load menu data
    const loadData = async () => {
      
        const data = await getMenuData();
        setMenuData(data);
        // Update activeCategory once we have the data
        if (data?.categories?.length > 0) {
          setActiveCategory(data.categories?.[0]?.id || 'recommended');
        }
      
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!menuData) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const [category, ref] of Object.entries(sectionRefs.current)) {
        if (!ref) continue;

        const { offsetTop, offsetHeight } = ref;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveCategory(category);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuData]);

  const scrollToCategory = (categoryId: string) => {
    sectionRefs.current[categoryId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setActiveCategory(categoryId);
  };

  // Don't render until we have menu data
  if (!menuData) return null;

  const { categories, products } = menuData;

  const productsByCategory = categories.map(category => ({
    ...category,
    products: products.filter(product => product.category === category.id),
  }));

  return (
    <Layout
      activeCategory={activeCategory}
      onCategoryClick={scrollToCategory}
      categories={menuData?.categories || []}  // Pass categories with fallback
    >
      <main className="p-8">
        {productsByCategory.map(({ id, name, products }) => (
          <section
            key={id}
            ref={(element: HTMLDivElement | null) => {
              if (element) {
                sectionRefs.current[id] = element;
              }
            }}
            className="mb-12"
            id={id}
          >
            <h2 className="mb-6 text-3xl font-bold">{name}</h2>
            {products.length > 0 ? (
              <ProductGrid products={products} onProductSelect={setSelectedProduct} />
            ) : (
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
          onAddToOrder={function (_product: Product, _quantity: number): void {
            throw new Error('Function not implemented.');
          }}
        />
      )}
    </Layout>
  );
}