import SignIn from '../pages/admin/SignIn';
import SignUp from '../pages/admin/SignUp';
import Dashboard from '../pages/admin/Dashboard';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

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
      path: 'dashboard',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      index: true,
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
  ],
};
