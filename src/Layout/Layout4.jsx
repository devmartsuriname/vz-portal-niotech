import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header4 from "../Components/Header/Header4";

const Layout4 = () => {
    return (
        <div className="main-page-area3">
            <Header4></Header4>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout4;