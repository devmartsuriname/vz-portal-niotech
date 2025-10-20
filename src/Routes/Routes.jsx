import {
    createBrowserRouter,
  } from "react-router-dom";
import Layout4 from "../Layout/Layout4";
import AboutPage from "../Pages/AboutPage";
import Home from "../Pages/Home";
import ServicePage from "../Pages/ServicePage";
import ServiceDetailPage from "../Pages/ServiceDetailPage";
import ContactPage from "../Pages/ContactPage";
import BlogStandardPage from "../Pages/BlogStandardPage";
import BlogDetaillsPage from "../Pages/BlogDetaillsPage";
import FaqPage from "../Pages/FaqPage";
import { adminRoutes } from './AdminRoutes';


export const router = createBrowserRouter([
    adminRoutes,
    {
      path: "/",
      element: <Layout4></Layout4>,
      children: [
        {
          index: true,
          element: <Home></Home>,
        },
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
          path: "/faq",
          element: <FaqPage></FaqPage>,
        },
        {
          path: "/blog",
          element: <BlogStandardPage></BlogStandardPage>,
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
  ]);