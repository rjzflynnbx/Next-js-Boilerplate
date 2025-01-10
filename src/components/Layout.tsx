'use client';

import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8" style={{ overflowX: 'auto', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
