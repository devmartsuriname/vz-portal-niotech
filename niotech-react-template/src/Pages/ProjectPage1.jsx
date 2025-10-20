import BreadCumb from "../Components/Common/BreadCumb";
import Project1 from "../Components/Project/Project1";

const ProjectPage1 = () => {
    return (
        <div>
            <BreadCumb
                bgimg="/assets/images/bg/breadcumgBg.png"
                Title="Our Project 01"
            ></BreadCumb>  
            <Project1></Project1>           
        </div>
    );
};

export default ProjectPage1;