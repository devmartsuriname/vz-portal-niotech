import BlogStandard from "../Components/Blog/BlogStandard";
import BreadCumb from "../Components/Common/BreadCumb";

const BlogStandardPage = () => {
    return (
        <div>
        <BreadCumb
                bgimg="/assets/images/bg/breadcumgBg.png"
                Title="Blog Standard"
            ></BreadCumb> 
            <BlogStandard></BlogStandard>         
        </div>
    );
};

export default BlogStandardPage;