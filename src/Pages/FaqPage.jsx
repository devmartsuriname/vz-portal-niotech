import BreadCumb from "../Components/Common/BreadCumb";
import Faq2 from "../Components/Faq/Faq2";

const FaqPage = () => {
    return (
        <div>
            <BreadCumb
                bgimg="/assets/images/bg/breadcumgBg.png"
                Title="FAQ's"
            ></BreadCumb>
            <Faq2></Faq2>           
        </div>
    );
};

export default FaqPage;