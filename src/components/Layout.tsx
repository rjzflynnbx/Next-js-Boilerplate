'use client';

import Sidebar from '@/components/Sidebar';
import React, { type ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  activeCategory: string;
  onCategoryClick: (categoryId: string) => void;
};

export default function Layout({ children, activeCategory, onCategoryClick }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar activeCategory={activeCategory} onCategoryClick={onCategoryClick} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
