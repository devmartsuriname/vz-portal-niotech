import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header4 from "../Components/Header/Header4";
import ScrollToTop from "../Components/Common/ScrollToTop";
import SkipToContent from "../components/accessibility/SkipToContent";

const Layout4 = () => {
    return (
        <div className="main-page-area3">
            <SkipToContent />
            <Header4></Header4>
            <main id="main-content" tabIndex={-1}>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
            <ScrollToTop />
        </div>
    );
};

export default Layout4;