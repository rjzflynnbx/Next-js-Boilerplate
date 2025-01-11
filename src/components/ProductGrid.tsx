import type { Product } from '@/types';
import ProductCard from './ProductCard';

type ProductGridProps = {
  products: Product[];
  onProductSelect: (product: Product) => void; // Changed from onProductSelect
};

export default function ProductGrid({ products, onProductSelect }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onShowDetail={onProductSelect} // Pass the handler down
        />
      ))}
    </div>
  );
}
