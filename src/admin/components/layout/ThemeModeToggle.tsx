import { useEffect, useState } from 'react';
import IconifyIcon from '@/admin/components/wrapper/IconifyIcon';

const ThemeModeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') as 'light' | 'dark';
    setTheme(currentTheme || 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="topbar-item">
      <button className="topbar-button" id="light-dark-mode" onClick={toggleTheme}>
        <IconifyIcon icon="solar:moon-bold-duotone" className="fs-24 light-mode" />
        <IconifyIcon icon="solar:sun-bold-duotone" className="fs-24 dark-mode" />
      </button>
    </div>
  );
};

export default ThemeModeToggle;
