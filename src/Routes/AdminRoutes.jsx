import SignIn from '../admin/pages/auth/SignIn';
import SignUp from '../admin/pages/auth/SignUp';
import Dashboard from '../admin/pages/dashboard/Dashboard';
import AdminLayout from '../admin/layout/AdminLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { Navigate } from 'react-router-dom';

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
      ],
    },
  ],
};
