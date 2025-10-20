import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import AboutPage from "../Pages/AboutPage";
import Home from "../Pages/Home";
import Layout2 from "../Layout/Layout2";
import Home2 from "../Pages/Home2";
import Layout3 from "../Layout/Layout3";
import Home3 from "../Pages/Home3";
import Layout4 from "../Layout/Layout4";
import ServicePage from "../Pages/ServicePage";
import ServiceDetailPage from "../Pages/ServiceDetailPage";
import PricingPage from "../Pages/PricingPage";
import ProjectPage1 from "../Pages/ProjectPage1";
import ProjectPage2 from "../Pages/ProjectPage2";
import ProjectDetailPage from "../Pages/ProjectDetailPage";
import TeamPage from "../Pages/TeamPage";
import TeamDetailPage from "../Pages/TeamDetailPage";
import ContactPage from "../Pages/ContactPage";
import BlogPage from "../Pages/BlogPage";
import BlogStandardPage from "../Pages/BlogStandardPage";
import BlogLeftPage from "../Pages/BlogLeftPage";
import BlogDetaillsPage from "../Pages/BlogDetaillsPage";
import FaqPage from "../Pages/FaqPage";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout4></Layout4>,
      children: [
        {
            path: "/about",
            element: <AboutPage></AboutPage>,
        },   
        {
          path: "/service",
          element: <ServicePage></ServicePage>,
      }, 
      {
        path: "/service/service-details",
        element: <ServiceDetailPage></ServiceDetailPage>,
      },
      {
        path: "/pricing",
        element: <PricingPage></PricingPage>,
      },    
      {
        path: "/project",
        element: <ProjectPage1></ProjectPage1>,
      },      
      {
        path: "/project2",
        element: <ProjectPage2></ProjectPage2>,
      },       
      {
        path: "/project/project-details",
        element: <ProjectDetailPage></ProjectDetailPage>,
      },
      {
        path: "/team",
        element: <TeamPage></TeamPage>,
      },
      {
        path: "/team/team-details",
        element: <TeamDetailPage></TeamDetailPage>,
      },
      {
        path: "/faq",
        element: <FaqPage></FaqPage>,
      },
      {
        path: "/blog",
        element: <BlogPage></BlogPage>,
      },
      {
        path: "/blog-sidebar",
        element: <BlogStandardPage></BlogStandardPage>,
      },
      {
        path: "/blog-left-sidebar",
        element: <BlogLeftPage></BlogLeftPage>,
      },
      {
        path: "/blog/blog-details",
        element: <BlogDetaillsPage></BlogDetaillsPage>,
      },
      {
        path: "/contact",
        element: <ContactPage></ContactPage>,
      },

      ],
    }, 
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          index: true,
          element: <Home></Home>,
        },                           
      ],
    }, 
    {
      path: 'home2',
      element: <Layout2></Layout2>,
      children: [
        {
          index: true,
          element: <Home2></Home2>,
        },                           
      ],
    }, 
    {
      path: 'home3',
      element: <Layout3></Layout3> ,
      children: [
        {
          index: true,
          element: <Home3></Home3>,
        },                           
      ],
    },             
  ]);