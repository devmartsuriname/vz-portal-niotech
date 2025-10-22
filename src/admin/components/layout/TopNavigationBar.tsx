import { useState } from 'react';
import IconifyIcon from '@/admin/components/wrapper/IconifyIcon';
import ProfileDropdown from './ProfileDropdown';
import ThemeModeToggle from './ThemeModeToggle';
import NotificationDropdown from './NotificationDropdown';
import CompactModeToggle from '@/admin/components/ui/CompactModeToggle';

const TopNavigationBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const toggleSidebar = () => {
    const htmlTag = document.getElementsByTagName('html')[0];
    htmlTag.classList.toggle('sidebar-enable');
  };

  return (
    <div className="app-topbar">
      <div className="navbar-header">
        <div className="d-flex align-items-center gap-2">
          <button 
            className="btn btn-sm topbar-button" 
            onClick={toggleSidebar}
            data-tooltip="Toggle sidebar menu"
            aria-label="Toggle sidebar navigation"
          >
            <IconifyIcon icon="solar:hamburger-menu-line-duotone" className="fs-24 icon-rotate" aria-hidden="true" />
          </button>

          <div className="app-search d-none d-md-block">
            <form role="search">
              <div className="position-relative">
                <label htmlFor="admin-search" className="visually-hidden">Search admin panel</label>
                <input
                  id="admin-search"
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  aria-label="Search admin panel"
                />
                <span className="search-widget-icon" aria-hidden="true">
                  <IconifyIcon icon="solar:magnifer-linear" />
                </span>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex align-items-center gap-1">
          <NotificationDropdown />
          <CompactModeToggle />
          <ThemeModeToggle />
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default TopNavigationBar;
