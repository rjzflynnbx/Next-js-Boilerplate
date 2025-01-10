'use client';

import Sidebar from '@/components/Sidebar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
