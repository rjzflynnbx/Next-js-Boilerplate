import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const DemoLoginButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get('userType') || 'loyal';
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginState = localStorage.getItem('kfcKnownCustomer');
    setIsLoggedIn(loginState === 'true');
  }, []);

  const handleLogin = () => {
    localStorage.setItem('kfcKnownCustomer', 'true');
    router.push('?userType=loyal');
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.setItem('kfcKnownCustomer', 'false');
    router.push('/en');
    window.location.reload();
  };

  const toggleUser = () => {
    const newType = userType === 'loyal' ? 'healthy' : 'loyal';
    router.push(`?userType=${newType}`);
  };

  if (!isLoggedIn) {
    return (
      <button
        onClick={handleLogin}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Demo: Scan to Login
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleUser}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Demo: Switch to {userType === 'loyal' ? 'Mike' : 'Sarah'}
      </button>
      <span className="text-gray-400">|</span>
      <span className="text-sm text-gray-500">
        {userType === 'loyal' ? 'Sarah' : 'Mike'}
      </span>
      <span className="text-gray-400">|</span>
      <button
        onClick={handleLogout}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Logout
      </button>
    </div>
  );
};

export default DemoLoginButton;