import { getMenuItems } from '@/admin/helpers/Menu';
import SimplebarReactClient from '@/admin/components/wrapper/SimplebarReactClient';
import LogoBox from '@/admin/components/wrapper/LogoBox';
import AppMenu from './AppMenu';

const VerticalNavigationBar = () => {
  const menuItems = getMenuItems();
  return (
    <div className="app-sidebar">
      <LogoBox />
      <SimplebarReactClient id="leftside-menu-container" className="scrollbar" data-simplebar>
        <AppMenu menuItems={menuItems} />
      </SimplebarReactClient>
    </div>
  );
};

export default VerticalNavigationBar;
