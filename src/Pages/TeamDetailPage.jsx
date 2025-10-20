import BreadCumb from "../Components/Common/BreadCumb";
import TeamDetails from "../Components/TeamDetails/TeamDetails";

const TeamDetailPage = () => {
    return (
        <div>
             <BreadCumb
                bgimg="/assets/images/bg/breadcumgBg.png"
                Title="Team Details"
            ></BreadCumb> 
            <TeamDetails></TeamDetails>           
        </div>
    );
};

export default TeamDetailPage;