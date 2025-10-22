import { lazy, Suspense } from 'react';
import SignIn from '../admin/pages/auth/SignIn';
import SignUp from '../admin/pages/auth/SignUp';
import Dashboard from '../admin/pages/dashboard/Dashboard';
import AdminLayout from '../admin/layout/AdminLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import TableSkeleton from '../admin/components/ui/TableSkeleton';

const SubmissionsList = lazy(() => import('../admin/pages/submissions/SubmissionsList'));
const SubmissionDetails = lazy(() => import('../admin/pages/submissions/SubmissionDetails'));
const ContentManager = lazy(() => import('../admin/pages/content/ContentManager'));
const Reports = lazy(() => import('../admin/pages/reports/Reports'));
const ActivityLogs = lazy(() => import('../admin/pages/activity/ActivityLogs'));
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
          element: (
            <Suspense fallback={<TableSkeleton rows={10} columns={6} />}>
              <SubmissionsList />
            </Suspense>
          ),
        },
        {
          path: 'submissions/:id',
          element: (
            <Suspense fallback={<TableSkeleton rows={5} columns={2} />}>
              <SubmissionDetails />
            </Suspense>
          ),
        },
        {
          path: 'content',
          element: (
            <Suspense fallback={<TableSkeleton rows={8} columns={5} />}>
              <ContentManager />
            </Suspense>
          ),
        },
        {
          path: 'reports',
          element: (
            <Suspense fallback={<TableSkeleton rows={6} columns={4} />}>
              <Reports />
            </Suspense>
          ),
        },
        {
          path: 'activity',
          element: (
            <Suspense fallback={<TableSkeleton rows={10} columns={5} />}>
              <ActivityLogs />
            </Suspense>
          ),
        },
        {
          path: 'settings',
          element: (
            <Suspense fallback={<TableSkeleton rows={4} columns={2} />}>
              <Settings />
            </Suspense>
          ),
        },
        {
          path: 'users/roles',
          element: (
            <Suspense fallback={<TableSkeleton rows={6} columns={4} />}>
              <UserRolesManager />
            </Suspense>
          ),
        },
        {
          path: 'wizard/rules',
          element: (
            <Suspense fallback={<TableSkeleton rows={8} columns={5} />}>
              <WizardRulesManager />
            </Suspense>
          ),
        },
        {
          path: 'wizard/documents',
          element: (
            <Suspense fallback={<TableSkeleton rows={8} columns={4} />}>
              <DocumentMappingManager />
            </Suspense>
          ),
        },
      ],
    },
  ],
};
