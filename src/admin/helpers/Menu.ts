export interface MenuItemType {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
  url?: string;
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  target?: string;
  isDisabled?: boolean;
  children?: MenuItemType[];
}

export const getMenuItems = (): MenuItemType[] => {
  return [
    {
      key: 'menu',
      label: 'Menu',
      isTitle: true,
    },
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'solar:widget-5-bold-duotone',
      url: '/admin/dashboard',
      badge: {
        variant: 'success',
        text: '03',
      },
    },
    {
      key: 'authentication',
      label: 'Authentication',
      icon: 'solar:lock-password-bold-duotone',
      children: [
        {
          key: 'auth-sign-in',
          label: 'Sign In',
          url: '/admin/auth/sign-in',
          parentKey: 'authentication',
        },
        {
          key: 'auth-sign-up',
          label: 'Sign Up',
          url: '/admin/auth/sign-up',
          parentKey: 'authentication',
        },
        {
          key: 'auth-reset-password',
          label: 'Reset Password',
          url: '#',
          parentKey: 'authentication',
        },
        {
          key: 'auth-lock-screen',
          label: 'Lock Screen',
          url: '#',
          parentKey: 'authentication',
        },
      ],
    },
    {
      key: 'error-pages',
      label: 'Error Pages',
      icon: 'solar:danger-triangle-bold-duotone',
      children: [
        {
          key: 'error-404',
          label: 'Error 404',
          url: '#',
          parentKey: 'error-pages',
        },
        {
          key: 'error-404-alt',
          label: 'Error 404 (alt)',
          url: '#',
          parentKey: 'error-pages',
        },
        {
          key: 'error-500',
          label: 'Error 500',
          url: '#',
          parentKey: 'error-pages',
        },
      ],
    },
    {
      key: 'ui-kit',
      label: 'UI Kit',
      isTitle: true,
    },
    {
      key: 'base-ui',
      label: 'Base UI',
      icon: 'solar:bookmark-bold-duotone',
      children: [
        {
          key: 'ui-accordion',
          label: 'Accordion',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-alerts',
          label: 'Alerts',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-avatar',
          label: 'Avatar',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-badge',
          label: 'Badge',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-breadcrumb',
          label: 'Breadcrumb',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-buttons',
          label: 'Buttons',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-cards',
          label: 'Cards',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-carousel',
          label: 'Carousel',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-collapse',
          label: 'Collapse',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-dropdown',
          label: 'Dropdown',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-list-group',
          label: 'List Group',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-modal',
          label: 'Modal',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-offcanvas',
          label: 'Offcanvas',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-pagination',
          label: 'Pagination',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-placeholder',
          label: 'Placeholder',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-popovers',
          label: 'Popovers',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-progress',
          label: 'Progress',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-spinners',
          label: 'Spinners',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-tabs',
          label: 'Tabs',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-tooltips',
          label: 'Tooltips',
          url: '#',
          parentKey: 'base-ui',
        },
        {
          key: 'ui-typography',
          label: 'Typography',
          url: '#',
          parentKey: 'base-ui',
        },
      ],
    },
    {
      key: 'apex-charts',
      label: 'Apex Charts',
      icon: 'solar:pie-chart-bold-duotone',
      url: '#',
    },
    {
      key: 'forms',
      label: 'Forms',
      icon: 'solar:bill-list-bold-duotone',
      children: [
        {
          key: 'forms-basic',
          label: 'Basic Elements',
          url: '#',
          parentKey: 'forms',
        },
        {
          key: 'forms-flat-picker',
          label: 'Flat Picker',
          url: '#',
          parentKey: 'forms',
        },
        {
          key: 'forms-validation',
          label: 'Validation',
          url: '#',
          parentKey: 'forms',
        },
        {
          key: 'forms-file-uploads',
          label: 'File Uploads',
          url: '#',
          parentKey: 'forms',
        },
        {
          key: 'forms-editors',
          label: 'Editors',
          url: '#',
          parentKey: 'forms',
        },
      ],
    },
    {
      key: 'tables',
      label: 'Tables',
      icon: 'solar:tuning-square-2-bold-duotone',
      children: [
        {
          key: 'tables-basic',
          label: 'Basic Tables',
          url: '#',
          parentKey: 'tables',
        },
        {
          key: 'tables-gridjs',
          label: 'Grid Js',
          url: '#',
          parentKey: 'tables',
        },
      ],
    },
    {
      key: 'icons',
      label: 'Icons',
      icon: 'solar:case-round-bold-duotone',
      children: [
        {
          key: 'icons-box',
          label: 'Box Icons',
          url: '#',
          parentKey: 'icons',
        },
        {
          key: 'icons-solar',
          label: 'Solar Icons',
          url: '#',
          parentKey: 'icons',
        },
      ],
    },
    {
      key: 'maps',
      label: 'Maps',
      icon: 'solar:map-point-wave-bold-duotone',
      children: [
        {
          key: 'maps-google',
          label: 'Google Maps',
          url: '#',
          parentKey: 'maps',
        },
        {
          key: 'maps-vector',
          label: 'Vector Maps',
          url: '#',
          parentKey: 'maps',
        },
      ],
    },
    {
      key: 'other',
      label: 'Other',
      isTitle: true,
    },
    {
      key: 'layouts',
      label: 'Layouts',
      icon: 'solar:sidebar-minimalistic-bold-duotone',
      children: [
        {
          key: 'layouts-dark-sidenav',
          label: 'Dark Sidenav',
          url: '#',
          parentKey: 'layouts',
        },
        {
          key: 'layouts-dark-topnav',
          label: 'Dark Topnav',
          url: '#',
          parentKey: 'layouts',
        },
        {
          key: 'layouts-small-sidenav',
          label: 'Small Sidenav',
          url: '#',
          parentKey: 'layouts',
        },
        {
          key: 'layouts-hidden-sidenav',
          label: 'Hidden Sidenav',
          url: '#',
          parentKey: 'layouts',
        },
        {
          key: 'layouts-darkmode',
          label: 'Darkmode',
          url: '#',
          parentKey: 'layouts',
          badge: {
            variant: 'danger',
            text: 'New',
          },
        },
      ],
    },
    {
      key: 'menu-item',
      label: 'Menu Item',
      icon: 'solar:share-bold-duotone',
      children: [
        {
          key: 'menu-item-1',
          label: 'Menu Item 1',
          url: '#',
          parentKey: 'menu-item',
        },
        {
          key: 'menu-item-2',
          label: 'Menu Item 2',
          url: '#',
          parentKey: 'menu-item',
        },
      ],
    },
    {
      key: 'disable-item',
      label: 'Disable Item',
      icon: 'solar:lock-keyhole-bold-duotone',
      url: '#',
      isDisabled: true,
    },
  ];
};

export const findAllParent = (menuItems: MenuItemType[], menuItem: MenuItemType): string[] => {
  let parents: string[] = [];
  const parent = findMenuItem(menuItems, menuItem.parentKey);
  if (parent) {
    parents.push(parent.key);
    if (parent.parentKey) {
      parents = [...parents, ...findAllParent(menuItems, parent)];
    }
  }
  return parents;
};

export const getMenuItemFromURL = (
  items: MenuItemType | MenuItemType[],
  url: string
): MenuItemType | undefined => {
  if (items instanceof Array) {
    for (const item of items) {
      const foundItem = getMenuItemFromURL(item, url);
      if (foundItem) {
        return foundItem;
      }
    }
  } else {
    if (items.url == url) return items;
    if (items.children != null) {
      for (const item of items.children) {
        if (item.url == url) return item;
      }
    }
  }
};

export const findMenuItem = (
  menuItems: MenuItemType[] | undefined,
  menuItemKey: MenuItemType['key'] | undefined
): MenuItemType | null => {
  if (menuItems && menuItemKey) {
    for (const item of menuItems) {
      if (item.key === menuItemKey) {
        return item;
      }
      const found = findMenuItem(item.children, menuItemKey);
      if (found) return found;
    }
  }
  return null;
};
