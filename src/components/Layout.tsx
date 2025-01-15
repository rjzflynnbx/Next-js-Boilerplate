// src/components/Layout.tsx
'use client';

import DemoLoginButton from './DemoLoginButton';
import DemoTimeControl from './DemoTimeControl';

interface LayoutProps {
  children: React.ReactNode;
  activeCategory: string;
  onCategoryClick: (category: string) => void;
  // Add categories to props
  categories?: { id: string; name: string }[];
}

export default function Layout({ 
  children, 
  activeCategory, 
  onCategoryClick,
  categories = [] // Provide default empty array
}: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Menu */}
      <div className="w-64 bg-white shadow-lg">
        
        <nav className="px-6 pt-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className={`w-full text-left py-2 px-4 rounded mb-2 ${
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

       {/* Demo Controls */}
      <DemoLoginButton />     {/* Login top-right */}
      <DemoTimeControl />     {/* Time bottom-left */}
    </div>
  );
}