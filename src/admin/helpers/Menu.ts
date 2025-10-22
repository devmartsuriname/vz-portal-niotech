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
      key: 'main',
      label: 'Hoofdmenu',
      isTitle: true,
    },
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'solar:widget-5-bold-duotone',
      url: '/admin/dashboard',
    },
    {
      key: 'submissions',
      label: 'Aanvragen',
      icon: 'solar:documents-bold-duotone',
      url: '/admin/submissions',
    },
    {
      key: 'content',
      label: 'Content Beheer',
      icon: 'solar:file-text-bold-duotone',
      url: '/admin/content',
    },
    {
      key: 'reports',
      label: 'Rapporten',
      icon: 'solar:chart-2-bold-duotone',
      url: '/admin/reports',
    },
    {
      key: 'settings',
      label: 'Instellingen',
      icon: 'solar:settings-bold-duotone',
      url: '/admin/settings',
    },
    {
      key: 'users',
      label: 'Gebruikers',
      icon: 'solar:users-group-rounded-bold-duotone',
      children: [
        {
          key: 'users-roles',
          label: 'Rollen',
          url: '/admin/users/roles',
          parentKey: 'users',
        },
      ],
    },
    {
      key: 'wizard',
      label: 'Wizard Beheer',
      icon: 'solar:routing-2-bold-duotone',
      children: [
        {
          key: 'wizard-rules',
          label: 'Wizard Regels',
          url: '/admin/wizard/rules',
          parentKey: 'wizard',
        },
        {
          key: 'wizard-documents',
          label: 'Document Mappings',
          url: '/admin/wizard/documents',
          parentKey: 'wizard',
        },
      ],
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
