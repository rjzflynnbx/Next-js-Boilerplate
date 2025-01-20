// src/components/DemoTimeControl.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function DemoTimeControl() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get initial time
    const storedTime = localStorage.getItem('kfcTimeOfDay');
    if (storedTime) {
      setCurrentTime(`${storedTime}:00`);
    }

    // Handle clicks outside
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const setTime = (hour: number) => {
    localStorage.setItem('kfcTimeOfDay', hour.toString());
    setCurrentTime(`${hour}:00`);
    setIsOpen(false);
    window.location.reload(); // Refresh to see new menu
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 opacity-30 hover:opacity-100 text-xs text-gray-500"
      >
        Demo: Set Time {currentTime ? `(${currentTime})` : ''}
      </button>
    );
  }

  return (
    <div ref={containerRef} className="fixed bottom-4 left-4 bg-white p-2 rounded shadow-lg text-xs">
      <div className="mb-2">Set Demo Time:</div>
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setTime(8)}
          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Morning (8:00)
        </button>
        <button
          onClick={() => setTime(13)}
          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Lunch (13:00)
        </button>
        <button
          onClick={() => setTime(21)}
          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Late Night (21:00)
        </button>
      </div>
    </div>
  );
}