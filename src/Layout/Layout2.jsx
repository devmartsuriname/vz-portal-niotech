import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Header2 from '../Components/Header/Header2';

const Layout2 = () => {
    return (
        <div className='main-page-area2'>
            <Header2></Header2>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout2;