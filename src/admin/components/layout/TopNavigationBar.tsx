import { useState } from 'react';
import IconifyIcon from '@/admin/components/wrapper/IconifyIcon';
import ProfileDropdown from './ProfileDropdown';
import ThemeModeToggle from './ThemeModeToggle';

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
            <IconifyIcon icon="solar:hamburger-menu-line-duotone" className="fs-24" />
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
          <ThemeModeToggle />
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default TopNavigationBar;
