import { Outlet } from 'react-router-dom';
import { useEffect, Suspense } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import VerticalNavigationBar from '../components/layout/VerticalNavigationBar';
import TopNavigationBar from '../components/layout/TopNavigationBar';
import Footer from '../components/layout/Footer';
import AnimationStar from '../components/AnimationStar';
import TableSkeleton from '../components/ui/TableSkeleton';
import '../assets/scss/style.scss';

const AdminLayout = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.documentElement.setAttribute('data-sidebar-color', 'dark');
    document.documentElement.setAttribute('data-topbar-color', 'dark');
    document.documentElement.setAttribute('data-sidebar-size', 'default');

    // Prefetch common admin data on layout mount
    const prefetchCommonData = async () => {
      // Prefetch user profile data
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        queryClient.prefetchQuery({
          queryKey: ['user_profile', user.id],
          queryFn: async () => {
            const { data } = await supabase
              .from('user_roles')
              .select('*')
              .eq('user_id', user.id)
              .single();
            return data;
          },
        });
      }

      // Prefetch application types for wizard
      queryClient.prefetchQuery({
        queryKey: ['application_types'],
        queryFn: async () => {
          const { data } = await supabase
            .from('application_types')
            .select('*')
            .order('name');
          return data;
        },
      });

      // Prefetch document types
      queryClient.prefetchQuery({
        queryKey: ['document_types'],
        queryFn: async () => {
          const { data } = await supabase
            .from('document_types')
            .select('*')
            .order('name');
          return data;
        },
      });
    };

    prefetchCommonData();
  }, [queryClient]);

  return (
    <div className="wrapper">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <TopNavigationBar />
      <VerticalNavigationBar />
      <AnimationStar />
      <div className="page-content">
        <div className="container-fluid">
          <main id="main-content" tabIndex={-1}>
            <Suspense fallback={<TableSkeleton rows={8} columns={5} />}>
              <Outlet />
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
