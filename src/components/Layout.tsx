'use client';

import Sidebar from '@/components/Sidebar';
import React, { type ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  onCategoryClick: (categoryId: string) => void;
  activeCategory: string;
};

export default function Layout({ children, onCategoryClick, activeCategory }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="fixed left-0 top-0 h-screen">
        <Sidebar onCategoryClick={onCategoryClick} activeCategory={activeCategory} />
      </div>
      <div className="ml-64 flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
