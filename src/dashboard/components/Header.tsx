import { useState, useEffect } from 'react';

export function Header() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className='header shadow flex items-center justify-between px-6 py-4 text-primary'>
      <div className='text-xl font-bold'>Work From Home Request</div>
      <button
        onClick={toggleTheme}
        className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'
      >
        Toggle Theme
      </button>
      <div className='cursor-pointer hover:text-gray-500'>Login</div>
    </header>
  );
}
