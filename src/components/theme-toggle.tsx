'use client';

import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-8 rounded-full w-14 transition-colors focus:outline-none bg-gray-200 dark:bg-gray-700"
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`${
          theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
        } inline-block w-6 h-6 transform rounded-full transition-transform duration-200 ease-in-out bg-white dark:bg-gray-800`}
      />
      <span
        className={`absolute ${theme === 'dark' ? 'left-1.5' : 'right-1.5'} text-sm`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
    </button>
  );
};
