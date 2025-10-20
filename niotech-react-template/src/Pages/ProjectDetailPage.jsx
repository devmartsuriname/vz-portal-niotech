import BreadCumb from "../Components/Common/BreadCumb";
import ProjectDetails from "../Components/ProjectDetails/ProjectDetails";

const ProjectDetailPage = () => {
    return (
        <div>
             <BreadCumb
                bgimg="/assets/images/bg/breadcumgBg.png"
                Title="Project Details"
            ></BreadCumb>    
            <ProjectDetails></ProjectDetails>         
        </div>
    );
};

export default ProjectDetailPage;