'use client';

import { getMenuData } from '@/utils/getData';

type LayoutProps = {
  children: React.ReactNode;
  activeCategory: string;
  onCategoryClick: (category: string) => void;
};

const { categories } = getMenuData();

export default function Layout({ children, activeCategory, onCategoryClick }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Menu */}
      <div className="w-64 bg-white shadow-lg">

        <nav className="px-6 pt-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className={`mb-2 w-full rounded px-4 py-2 text-left ${
                activeCategory === category.id ? 'bg-red-600 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
