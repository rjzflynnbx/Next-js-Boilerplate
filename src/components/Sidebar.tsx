'use client';

import Link from 'next/link';
import { useState } from 'react';

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

export default function Sidebar() {
  const [activeCategory, setActiveCategory] = useState('recommended');

  return (
    <aside className="min-h-screen w-64 border-r bg-white">
      <nav className="p-4">
        {categories.map(category => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className={`my-1 block rounded px-4 py-2 transition-colors ${
              activeCategory === category.id
                ? 'bg-red-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
