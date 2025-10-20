import BreadCumb from "../Components/Common/BreadCumb";
import Cta2 from "../Components/Cta/Cta2";
import Services1 from "../Components/Services/Services1";


const ServicePage = () => {
    return (
        <div>
            <BreadCumb
                bgimg="/assets/images/bg/breadcumgBg.png"
                Title="Onze Diensten"
            ></BreadCumb>
            <Cta2></Cta2>  
            <Services1></Services1>
        </div>
    );
};

export default ServicePage;