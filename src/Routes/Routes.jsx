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
import { lazyRetry } from "../utils/lazyRetry";

// Wizard components (eager load to avoid duplicate React issues)
import ApplicationWizard from "../Pages/Wizard/ApplicationWizard";
import ConfirmationPage from "../Pages/Wizard/ConfirmationPage";

// Lazy load public pages with retry logic for better reliability
const AboutPage = lazy(() => lazyRetry(() => import("../Pages/AboutPage")));
const ServicePage = lazy(() => lazyRetry(() => import("../Pages/ServicePage")));
const ContactPage = lazy(() => lazyRetry(() => import("../Pages/ContactPage")));
const FaqPage = lazy(() => lazyRetry(() => import("../Pages/FaqPage")));
const Instructies = lazy(() => lazyRetry(() => import("../Pages/Instructies")));
const DocumentenLijsten = lazy(() => lazyRetry(() => import("../Pages/DocumentenLijsten")));
const AanvraagIndienen = lazy(() => lazyRetry(() => import("../Pages/AanvraagIndienen")));
const Vergunningen = lazy(() => lazyRetry(() => import("../Pages/Vergunningen")));
const Overzicht = lazy(() => lazyRetry(() => import("../Pages/Overzicht")));
const Feedback = lazy(() => lazyRetry(() => import("../Pages/Feedback")));
const BlogPage = lazy(() => lazyRetry(() => import("../Pages/BlogPage")));
const BlogDetaillsPage = lazy(() => lazyRetry(() => import("../Pages/BlogDetaillsPage")));
const BlogStandardPage = lazy(() => lazyRetry(() => import("../Pages/BlogStandardPage")));


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
