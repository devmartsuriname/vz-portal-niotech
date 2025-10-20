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
    <ul className="menu">
      {menuItems.map((item, idx) => {
        if (item.isTitle) {
          return (
            <li key={idx} className="menu-title">
              {item.label}
            </li>
          );
        }

        return (
          <li key={idx} className={isActiveRoute(item.url) ? 'active' : ''}>
            <Link to={item.url || '#'} className="menu-link">
              {item.icon && <IconifyIcon icon={item.icon} className="menu-icon" />}
              <span className="menu-text">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default AppMenu;
