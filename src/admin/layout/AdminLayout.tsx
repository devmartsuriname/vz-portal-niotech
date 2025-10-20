import { Outlet } from 'react-router-dom';
import VerticalNavigationBar from '../components/layout/VerticalNavigationBar';
import TopNavigationBar from '../components/layout/TopNavigationBar';
import Footer from '../components/layout/Footer';
import '../assets/scss/style.scss';

const AdminLayout = () => {
  return (
    <div className="wrapper">
      <VerticalNavigationBar />
      <div className="content-page">
        <TopNavigationBar />
        <div className="content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
