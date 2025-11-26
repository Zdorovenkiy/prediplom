import { Suspense, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { FC } from 'react';
import type{ RouteObject } from 'react-router-dom';
import { routeConfig } from './config/routeConfig';


const AppRouter: FC = () => {
  const renderWithWrapper = useCallback((route: RouteObject) => {
    const element = (
      <Suspense
        fallback={
          <div>
            loading
          </div>
        }
      >
            {route.element}
      </Suspense>
    );

    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default AppRouter;
