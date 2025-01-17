'use client';

import CartIcon from './CartIcon';
import DemoLoginButton from './DemoLoginButton';
import DemoTimeControl from './DemoTimeControl';
import { useEffect, useState } from 'react';
import { getMenuData } from '@/utils/getData';
import type { Product } from '@/types';
import EngageService from '@/app/_api/engage';

interface LayoutProps {
  children: React.ReactNode;
  activeCategory: string;
  onCategoryClick: (category: string) => void;
  categories: { id: string; name: string; }[]; // Add this line
}

export default function Layout({ children, activeCategory, onCategoryClick }: LayoutProps) {
  const [categories, setCategories] = useState<{ id: string; name: string; }[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getMenuData();
      setCategories(data.categories);
    };
    loadCategories();
  }, []);

  const handleCategoryClick = async (categoryId: string, categoryName: string) => {
    // Call original click handler
    onCategoryClick(categoryId);

    // Track the category click
    try {
      const engage = await EngageService.getInstance();
      await engage?.event('KFC_CATEGORY_CLICKED', {
        channel: "KIOSK",
        currency: "GBP",
        pointOfSale: "SomeDemo",
        page: "home",
        language: "en"
      }, {
        categoryId,
        categoryName
      });
    } catch (error) {
      console.log('Engage tracking error:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Menu */}
      <div className="w-64 bg-white shadow-lg">
        
        <nav className="px-6 pt-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id, category.name)}
              className={`w-full text-left py-2 px-4 rounded mb-2 ${
                activeCategory === category.id ? 'bg-red-600 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area with Header */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-white shadow-sm flex items-center justify-end px-6">
          <div className="flex items-center gap-4">
            <DemoLoginButton />
            <CartIcon />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>

      {/* Demo Time Control stays at bottom */}
      <DemoTimeControl />
    </div>
  );
}