import BreadCumb from "../Components/Common/BreadCumb";
import Team1 from "../Components/Team/Team1";


const TeamPage = () => {
    return (
        <div>
             <BreadCumb
                bgimg="/assets/images/bg/breadcumgBg.png"
                Title="Team"
            ></BreadCumb>   
            <Team1></Team1>        
        </div>
    );
};

export default TeamPage;