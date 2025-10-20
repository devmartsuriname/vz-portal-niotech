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
    },
  ];
};
