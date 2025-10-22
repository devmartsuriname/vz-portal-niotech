import { Link, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { MenuItemType, findAllParent, getMenuItemFromURL } from '@/admin/helpers/Menu';
import IconifyIcon from '@/admin/components/wrapper/IconifyIcon';
import clsx from 'clsx';

interface MenuItemWithChildrenProps {
  item: MenuItemType;
  linkClassName?: string;
  subMenuClassName?: string;
  activeMenuItems?: string[];
  toggleMenu?: (item: MenuItemType, status: boolean) => void;
  className?: string;
}

const MenuItemWithChildren = ({
  item,
  linkClassName,
  subMenuClassName,
  activeMenuItems,
  toggleMenu,
  className,
}: MenuItemWithChildrenProps) => {
  const [open, setOpen] = useState<boolean>(activeMenuItems?.includes(item.key) || false);

  useEffect(() => {
    setOpen(activeMenuItems?.includes(item.key) || false);
  }, [activeMenuItems, item.key]);

  const toggleMenuItem = () => {
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };

  return (
    <li className={clsx('nav-item', className)}>
      <Link
        to="#"
        className={clsx('nav-link', linkClassName, {
          'menu-open': open,
        })}
        aria-expanded={open}
        aria-label={`${item.label} menu - ${open ? 'Expanded' : 'Collapsed'}`}
        onClick={toggleMenuItem}
      >
        {item.icon && (
          <span className="nav-icon" aria-hidden="true">
            <IconifyIcon icon={item.icon} className="icon-scale" />
          </span>
        )}
        <span className="nav-text">{item.label}</span>
        {!item.badge && <span className="menu-arrow" aria-hidden="true"><IconifyIcon icon="bx:chevron-down" /></span>}
        {item.badge && (
          <span className={`badge bg-${item.badge.variant} rounded-pill ms-auto`} aria-label={`${item.badge.text} notifications`}>
            {item.badge.text}
          </span>
        )}
      </Link>
      <Collapse in={open}>
        <ul className={clsx(subMenuClassName)}>
          {(item.children || []).map((child, idx) => {
            return child.children ? (
              <MenuItemWithChildren
                key={idx}
                item={child}
                linkClassName={activeMenuItems?.includes(child.key) ? 'active' : ''}
                activeMenuItems={activeMenuItems}
                subMenuClassName="sub-navbar-nav"
                toggleMenu={toggleMenu}
              />
            ) : (
              <MenuItem
                key={idx}
                item={child}
                className={activeMenuItems?.includes(child.key) ? 'active' : ''}
                linkClassName={activeMenuItems?.includes(child.key) ? 'active' : ''}
              />
            );
          })}
        </ul>
      </Collapse>
    </li>
  );
};

const MenuItem = ({
  item,
  className,
  linkClassName,
}: {
  item: MenuItemType;
  className?: string;
  linkClassName?: string;
}) => {
  return (
    <li className={clsx('sub-nav-item', className)}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>
  );
};

const MenuItemLink = ({ item, className }: { item: MenuItemType; className?: string }) => {
  return (
    <Link
      to={item.url || '#'}
      target={item.target}
      className={clsx('sub-nav-link', className, {
        disabled: item.isDisabled,
      })}
      aria-disabled={item.isDisabled}
      aria-label={`${item.label} - Navigate to ${item.label}`}
    >
      {item.icon && (
        <span className="nav-icon" aria-hidden="true">
          <IconifyIcon icon={item.icon} className="icon-scale" />
        </span>
      )}
      <span className="nav-text">{item.label}</span>
      {item.badge && (
        <span className={`badge bg-${item.badge.variant} rounded-pill ms-auto`} aria-label={`${item.badge.text} items`}>
          {item.badge.text}
        </span>
      )}
    </Link>
  );
};

interface AppMenuProps {
  menuItems: MenuItemType[];
}

const AppMenu = ({ menuItems }: AppMenuProps) => {
  const location = useLocation();
  const [activeMenuItems, setActiveMenuItems] = useState<string[]>([]);

  const toggleMenu = useCallback((menuItem: MenuItemType, show: boolean) => {
    setActiveMenuItems((prevActiveMenuItems) => {
      if (show) {
        return [...prevActiveMenuItems, menuItem.key];
      }
      return prevActiveMenuItems.filter((item) => item !== menuItem.key);
    });
  }, []);

  const activeMenu = useCallback(() => {
    const trimmedURL = location.pathname;
    const matchingMenuItem = getMenuItemFromURL(menuItems, trimmedURL);

    if (matchingMenuItem) {
      const activeMt = findAllParent(menuItems, matchingMenuItem);
      setActiveMenuItems([matchingMenuItem.key, ...activeMt]);

      setTimeout(() => {
        const activatedItem = document.querySelector(`#navbar-nav a[href="${trimmedURL}"]`);
        const container = document.getElementById('leftside-menu-container');
        if (activatedItem && container) {
          const offset = activatedItem.getBoundingClientRect().top - container.getBoundingClientRect().top;
          const scrollPos = container.scrollTop + offset - 300;
          if (scrollPos >= 0) {
            try {
              container.scrollTo({
                top: scrollPos,
                behavior: 'smooth',
              });
            } catch {
              container.scrollTop = scrollPos;
            }
          }
        }
      }, 100);
    }
  }, [location.pathname, menuItems]);

  useEffect(() => {
    activeMenu();
  }, [activeMenu]);

  return (
    <ul className="navbar-nav" id="navbar-nav" role="navigation" aria-label="Main navigation">
      {menuItems.map((item, idx) => {
        if (item.isTitle) {
          return (
            <li key={idx} className="menu-title" role="presentation">
              {item.label}
            </li>
          );
        }

        if (item.children) {
          return (
            <MenuItemWithChildren
              key={idx}
              item={item}
              linkClassName={activeMenuItems.includes(item.key) ? 'active' : ''}
              activeMenuItems={activeMenuItems}
              subMenuClassName="sub-navbar-nav"
              toggleMenu={toggleMenu}
            />
          );
        }

        return (
          <li key={idx} className="nav-item">
            <Link
              to={item.url || '#'}
              target={item.target}
              className={clsx('nav-link', {
                active: activeMenuItems.includes(item.key),
                disabled: item.isDisabled,
              })}
              aria-disabled={item.isDisabled}
              aria-current={activeMenuItems.includes(item.key) ? 'page' : undefined}
              aria-label={`${item.label} - Navigate to ${item.label} section`}
            >
              {item.icon && (
                <span className="nav-icon" aria-hidden="true">
                  <IconifyIcon icon={item.icon} className="icon-scale" />
                </span>
              )}
              <span className="nav-text">{item.label}</span>
              {item.badge && (
                <span className={`badge bg-${item.badge.variant} rounded-pill ms-auto`} aria-label={`${item.badge.text} notifications`}>
                  {item.badge.text}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default AppMenu;
