import { useEffect, useState } from 'react';
import IconifyIcon from '@/admin/components/wrapper/IconifyIcon';

const ThemeModeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('bs-theme') as 'light' | 'dark';
    const currentTheme = savedTheme || document.documentElement.getAttribute('data-bs-theme') as 'light' | 'dark';
    setTheme(currentTheme || 'dark');
    
    if (savedTheme) {
      document.documentElement.setAttribute('data-bs-theme', savedTheme);
      document.documentElement.setAttribute('data-sidebar-color', savedTheme);
      document.documentElement.setAttribute('data-topbar-color', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const html = document.documentElement;
    
    // Update all theme-related attributes
    html.setAttribute('data-bs-theme', newTheme);
    html.setAttribute('data-sidebar-color', newTheme);
    html.setAttribute('data-topbar-color', newTheme);
    
    // Persist to localStorage
    localStorage.setItem('bs-theme', newTheme);
    
    setTheme(newTheme);
  };

  return (
    <div className="topbar-item">
      <button 
        className="topbar-button" 
        id="light-dark-mode" 
        onClick={toggleTheme}
        data-tooltip={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        aria-pressed={theme === 'dark'}
      >
        <IconifyIcon icon="solar:moon-bold-duotone" className="fs-24 light-mode" aria-hidden="true" />
        <IconifyIcon icon="solar:sun-bold-duotone" className="fs-24 dark-mode" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ThemeModeToggle;
