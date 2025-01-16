// src/components/DemoLoginButton.tsx
'use client';

import { useState, useEffect } from 'react';

export default function DemoLoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginState = localStorage.getItem('kfcKnownCustomer');
    setIsLoggedIn(loginState === 'true');
  }, []);

  const toggleLogin = () => {
    const newState = !isLoggedIn;
    localStorage.setItem('kfcKnownCustomer', newState.toString());
    setIsLoggedIn(newState);
    window.location.reload();
  };

  return (
    <button
      onClick={toggleLogin}
      className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-gray-500 opacity-30 hover:opacity-100"
    >
      <span>📱 Demo: {isLoggedIn ? 'Logout' : 'Scan to Login'}</span>
    </button>
  );
}