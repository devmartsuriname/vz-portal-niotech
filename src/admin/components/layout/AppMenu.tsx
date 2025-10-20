import { Link, useLocation } from 'react-router-dom';
import { MenuItemType } from '@/admin/helpers/Menu';
import IconifyIcon from '@/admin/components/wrapper/IconifyIcon';

interface AppMenuProps {
  menuItems: MenuItemType[];
}

const AppMenu = ({ menuItems }: AppMenuProps) => {
  const location = useLocation();

  const isActiveRoute = (url?: string) => {
    if (!url) return false;
    return location.pathname === url;
  };

  return (
    <ul className="navbar-nav" id="navbar-nav">
      {menuItems.map((item, idx) => {
        if (item.isTitle) {
          return (
            <li key={idx} className="menu-title">
              {item.label}
            </li>
          );
        }

        return (
          <li key={idx} className="nav-item">
            <Link 
              to={item.url || '#'} 
              className={`nav-link ${isActiveRoute(item.url) ? 'active' : ''}`}
            >
              {item.icon && (
                <span className="nav-icon">
                  <IconifyIcon icon={item.icon} />
                </span>
              )}
              <span className="nav-text">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default AppMenu;
