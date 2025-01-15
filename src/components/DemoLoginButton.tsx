// src/components/DemoLoginButton.tsx
'use client';

import { useState, useEffect } from 'react';

export default function DemoLoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check initial login state
    const loginState = localStorage.getItem('kfcKnownCustomer');
    setIsLoggedIn(loginState === 'true');
  }, []);

  const toggleLogin = () => {
    const newState = !isLoggedIn;
    localStorage.setItem('kfcKnownCustomer', newState.toString());
    setIsLoggedIn(newState);
    window.location.reload(); // Refresh to show personalized content
  };

  return (
    <button
      onClick={toggleLogin}
      className="fixed top-4 right-4 opacity-30 hover:opacity-100 flex items-center gap-2 text-xs bg-white px-3 py-2 rounded-lg shadow-sm"
    >
      <span className="text-gray-500">📱 {isLoggedIn ? 'Logout' : 'Scan to Login'}</span>
    </button>
  );
}