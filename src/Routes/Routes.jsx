import { lazy, Suspense } from "react";
import {
    createBrowserRouter,
  } from "react-router-dom";
import Layout4 from "../Layout/Layout4";
import Home from "../Pages/Home";
import { adminRoutes } from './AdminRoutes';
import RouteError from "../components/common/RouteError";
import NotFound from "../pages/NotFound";
import PageSkeleton from "../components/common/PageSkeleton";

// Wizard components (eager load to avoid duplicate React issues)
import ApplicationWizard from "../Pages/Wizard/ApplicationWizard";
import ConfirmationPage from "../Pages/Wizard/ConfirmationPage";

// Lazy load public pages for better code splitting
const AboutPage = lazy(() => import("../Pages/AboutPage"));
const ServicePage = lazy(() => import("../Pages/ServicePage"));
const ContactPage = lazy(() => import("../Pages/ContactPage"));
const FaqPage = lazy(() => import("../Pages/FaqPage"));
const Instructies = lazy(() => import("../Pages/Instructies"));
const DocumentenLijsten = lazy(() => import("../Pages/DocumentenLijsten"));
const AanvraagIndienen = lazy(() => import("../Pages/AanvraagIndienen"));
const Vergunningen = lazy(() => import("../Pages/Vergunningen"));
const Overzicht = lazy(() => import("../Pages/Overzicht"));
const Feedback = lazy(() => import("../Pages/Feedback"));
const BlogPage = lazy(() => import("../Pages/BlogPage"));
const BlogDetaillsPage = lazy(() => import("../Pages/BlogDetaillsPage"));
const BlogStandardPage = lazy(() => import("../Pages/BlogStandardPage"));


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
            element: <Suspense fallback={<PageSkeleton />}><AboutPage /></Suspense>,
        },   
        {
          path: "/service",
          element: <Suspense fallback={<PageSkeleton />}><ServicePage /></Suspense>,
        }, 
        {
          path: "/faq",
          element: <Suspense fallback={<PageSkeleton />}><FaqPage /></Suspense>,
        },
        {
          path: "/contact",
          element: <Suspense fallback={<PageSkeleton />}><ContactPage /></Suspense>,
        },
        {
          path: "/instructies",
          element: <Suspense fallback={<PageSkeleton />}><Instructies /></Suspense>,
        },
        {
          path: "/documenten-lijsten",
          element: <Suspense fallback={<PageSkeleton />}><DocumentenLijsten /></Suspense>,
        },
        {
          path: "/aanvraag-indienen",
          element: <Suspense fallback={<PageSkeleton />}><AanvraagIndienen /></Suspense>,
        },
        {
          path: "/vergunningen",
          element: <Suspense fallback={<PageSkeleton />}><Vergunningen /></Suspense>,
        },
        {
          path: "/overzicht",
          element: <Suspense fallback={<PageSkeleton />}><Overzicht /></Suspense>,
        },
        {
          path: "/feedback",
          element: <Suspense fallback={<PageSkeleton />}><Feedback /></Suspense>,
        },
        {
          path: "/wizard",
          element: <ApplicationWizard />,
          errorElement: <RouteError />,
        },
        {
          path: "/wizard/confirmation/:submissionId",
          element: <ConfirmationPage />,
        },
        {
          path: "/blog",
          element: <Suspense fallback={<PageSkeleton />}><BlogPage /></Suspense>,
        },
        {
          path: "/blog/blog-details",
          element: <Suspense fallback={<PageSkeleton />}><BlogDetaillsPage /></Suspense>,
        },
        {
          path: "/blog/blog-standard",
          element: <Suspense fallback={<PageSkeleton />}><BlogStandardPage /></Suspense>,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ], {
    future: {
      v7_startTransition: true,
    },
  });
