import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header3 from "../Components/Header/Header3";

const Layout3 = () => {
    return (
        <div className="main-page-area3">
            <Header3></Header3>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout3;