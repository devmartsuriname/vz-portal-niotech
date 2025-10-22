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
          <button className="btn btn-sm topbar-button" onClick={toggleSidebar}>
            <IconifyIcon icon="solar:hamburger-menu-line-duotone" className="fs-24 icon-rotate" />
          </button>

          <div className="app-search d-none d-md-block">
            <form>
              <div className="position-relative">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <span className="search-widget-icon">
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
