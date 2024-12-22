import { useState, useEffect } from 'react';
import { useAuth } from '../../providers/UserAuthProvider';
import { Button } from '../../components/Button';

export function Header() {
  const { user, logout } = useAuth();
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
      <div className='text-xl font-bold'>Work From Home Studio</div>
      <Button onClick={toggleTheme} text='Toggle Theme' variant='secondary' />
      {user && <Button onClick={logout} text='Logout' variant='destructive' />}
    </header>
  );
}
