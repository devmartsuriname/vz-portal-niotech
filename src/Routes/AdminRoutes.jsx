import { lazy } from 'react';
import SignIn from '../admin/pages/auth/SignIn';
import SignUp from '../admin/pages/auth/SignUp';
import Dashboard from '../admin/pages/dashboard/Dashboard';
import AdminLayout from '../admin/layout/AdminLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { Navigate } from 'react-router-dom';

const SubmissionsList = lazy(() => import('../admin/pages/submissions/SubmissionsList'));
const SubmissionDetails = lazy(() => import('../admin/pages/submissions/SubmissionDetails'));
const ContentManager = lazy(() => import('../admin/pages/content/ContentManager'));
const Settings = lazy(() => import('../admin/pages/settings/Settings'));
const UserRolesManager = lazy(() => import('../admin/pages/users/UserRolesManager'));
const WizardRulesManager = lazy(() => import('../admin/pages/wizard/WizardRulesManager'));
const DocumentMappingManager = lazy(() => import('../admin/pages/wizard/DocumentMappingManager'));

export const adminRoutes = {
  path: '/admin',
  children: [
    {
      path: 'auth/sign-in',
      element: <SignIn />,
    },
    {
      path: 'auth/sign-up',
      element: <SignUp />,
    },
    {
      path: '',
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/admin/dashboard" replace />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'submissions',
          element: <SubmissionsList />,
        },
        {
          path: 'submissions/:id',
          element: <SubmissionDetails />,
        },
        {
          path: 'content',
          element: <ContentManager />,
        },
        {
          path: 'settings',
          element: <Settings />,
        },
        {
          path: 'users/roles',
          element: <UserRolesManager />,
        },
        {
          path: 'wizard/rules',
          element: <WizardRulesManager />,
        },
        {
          path: 'wizard/documents',
          element: <DocumentMappingManager />,
        },
      ],
    },
  ],
};
