import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import VerticalNavigationBar from '../components/layout/VerticalNavigationBar';
import TopNavigationBar from '../components/layout/TopNavigationBar';
import Footer from '../components/layout/Footer';
import AnimationStar from '../components/AnimationStar';
import '../assets/scss/style.scss';

const AdminLayout = () => {
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.documentElement.setAttribute('data-sidebar-color', 'dark');
    document.documentElement.setAttribute('data-topbar-color', 'dark');
    document.documentElement.setAttribute('data-sidebar-size', 'default');
  }, []);

  return (
    <div className="wrapper">
      <TopNavigationBar />
      <VerticalNavigationBar />
      <AnimationStar />
      <div className="page-content">
        <div className="container-fluid">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
