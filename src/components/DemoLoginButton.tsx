// src/components/DemoLoginButton.tsx
'use client';

import { useState, useEffect } from 'react';

export default function DemoLoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerId, setCustomerId] = useState<string>('regular123');

  useEffect(() => {
    const loginState = localStorage.getItem('kfcKnownCustomer');
    const storedCustomerId = localStorage.getItem('kfcCustomerId');
    setIsLoggedIn(loginState === 'true');
    if (storedCustomerId) {
      setCustomerId(storedCustomerId);
    }
  }, []);

  const toggleLogin = () => {
    const newState = !isLoggedIn;
    localStorage.setItem('kfcKnownCustomer', newState.toString());
    
    // Handle customerId
    if (newState) {
      localStorage.setItem('kfcCustomerId', customerId);
    } else {
      localStorage.removeItem('kfcCustomerId');
    }
    
    setIsLoggedIn(newState);
    window.location.reload();
  };

  const toggleCustomerId = () => {
    const newId = customerId === 'regular123' ? 'vip456' : 'regular123';
    setCustomerId(newId);
    if (isLoggedIn) {
      localStorage.setItem('kfcCustomerId', newId);
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleLogin}
        className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-gray-500 opacity-30 hover:opacity-100"
      >
        <span>📱 Demo: {isLoggedIn ? 'Logout' : 'Scan to Login'}</span>
      </button>
      {isLoggedIn && (
        <button
          onClick={toggleCustomerId}
          className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-gray-500 opacity-30 hover:opacity-100"
        >
          <span>👤 Switch to: {customerId === 'regular123' ? 'VIP' : 'Regular'}</span>
        </button>
      )}
    </div>
  );
}