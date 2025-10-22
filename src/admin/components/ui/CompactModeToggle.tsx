import { useState, useEffect } from 'react';
import IconifyIcon from '@/admin/components/wrapper/IconifyIcon';

const CompactModeToggle = () => {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    // Load compact mode preference from localStorage
    const savedMode = localStorage.getItem('admin-compact-mode');
    if (savedMode === 'true') {
      setIsCompact(true);
      document.documentElement.classList.add('compact-mode');
    }
  }, []);

  const toggleCompactMode = () => {
    const newMode = !isCompact;
    setIsCompact(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('compact-mode');
      localStorage.setItem('admin-compact-mode', 'true');
    } else {
      document.documentElement.classList.remove('compact-mode');
      localStorage.setItem('admin-compact-mode', 'false');
    }
  };

  return (
    <button
      className="btn btn-sm topbar-button"
      onClick={toggleCompactMode}
      title={isCompact ? 'Normal Mode' : 'Compact Mode'}
      aria-label={isCompact ? 'Switch to normal mode' : 'Switch to compact mode'}
    >
      <IconifyIcon 
        icon={isCompact ? "solar:maximize-square-3-bold-duotone" : "solar:minimize-square-3-bold-duotone"} 
        className="fs-20 icon-scale" 
      />
    </button>
  );
};

export default CompactModeToggle;
