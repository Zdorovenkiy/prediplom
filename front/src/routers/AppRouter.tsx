import { Suspense, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { FC } from 'react';
import type{ RouteObject } from 'react-router-dom';
import { routeConfig, AppRoutes } from './config/routeConfig';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import AdminLayout from '@/layouts/adminLayout/AdminLayout';


const AppRouter: FC = () => {
  const renderWithWrapper = useCallback((route: RouteObject) => {
    const isAdminRoute = route.path?.startsWith('/admin');
    
    const element = (
      <Suspense
        fallback={
          <div>
            loading
          </div>
        }
      >
        {isAdminRoute ? (
          <AdminLayout>
            {route.element}
          </AdminLayout>
        ) : (
          <MainLayout>
            {route.element}
          </MainLayout>
        )}
      </Suspense>
    );

    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default AppRouter;
