import { lazy, Suspense } from "react";
import {
    createBrowserRouter,
  } from "react-router-dom";
import Layout4 from "../Layout/Layout4";
import AboutPage from "../Pages/AboutPage";
import Home from "../Pages/Home";
import ServicePage from "../Pages/ServicePage";
import ContactPage from "../Pages/ContactPage";
import FaqPage from "../Pages/FaqPage";
import Instructies from "../Pages/Instructies";
import DocumentenLijsten from "../Pages/DocumentenLijsten";
import AanvraagIndienen from "../Pages/AanvraagIndienen";
import Vergunningen from "../Pages/Vergunningen";
import Overzicht from "../Pages/Overzicht";
import Feedback from "../Pages/Feedback";
import BlogPage from "../Pages/BlogPage";
import BlogDetaillsPage from "../Pages/BlogDetaillsPage";
import BlogStandardPage from "../Pages/BlogStandardPage";
import { adminRoutes } from './AdminRoutes';

// Lazy load wizard components to ensure React Query is initialized
const ApplicationWizard = lazy(() => import("../Pages/Wizard/ApplicationWizard"));
const ConfirmationPage = lazy(() => import("../Pages/Wizard/ConfirmationPage"));


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
          path: "/faq",
          element: <FaqPage></FaqPage>,
        },
        {
          path: "/contact",
          element: <ContactPage></ContactPage>,
        },
        {
          path: "/instructies",
          element: <Instructies></Instructies>,
        },
        {
          path: "/documenten-lijsten",
          element: <DocumentenLijsten></DocumentenLijsten>,
        },
        {
          path: "/aanvraag-indienen",
          element: <AanvraagIndienen></AanvraagIndienen>,
        },
        {
          path: "/vergunningen",
          element: <Vergunningen></Vergunningen>,
        },
        {
          path: "/overzicht",
          element: <Overzicht></Overzicht>,
        },
        {
          path: "/feedback",
          element: <Feedback></Feedback>,
        },
        {
          path: "/wizard",
          element: <Suspense fallback={<div>Loading...</div>}><ApplicationWizard /></Suspense>,
        },
        {
          path: "/wizard/confirmation/:submissionId",
          element: <Suspense fallback={<div>Loading...</div>}><ConfirmationPage /></Suspense>,
        },
        {
          path: "/blog",
          element: <BlogPage></BlogPage>,
        },
        {
          path: "/blog/blog-details",
          element: <BlogDetaillsPage></BlogDetaillsPage>,
        },
        {
          path: "/blog/blog-standard",
          element: <BlogStandardPage></BlogStandardPage>,
        },
      ],
    },
  ]);