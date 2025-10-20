import BreadCumb from "../Components/Common/BreadCumb";
import ContactInfo from "../Components/ContactInfo/ContactInfo";

const ContactPage = () => {
    return (
        <div>
             <BreadCumb
                bgimg="/assets/images/bg/breadcumgBg.png"
                Title="Contact Us"
            ></BreadCumb> 
            <ContactInfo></ContactInfo>            
        </div>
    );
};

export default ContactPage;