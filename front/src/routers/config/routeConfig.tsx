
import Auth from '@/pages/auth/Auth';
import NotFound from '@/pages/notFound/NotFound';
import SignUp from '@/pages/signUp/SignUp';
import type { RouteObject } from 'react-router-dom';

export enum AppRoutes {
    AUTH = "auth",
    SIGN_UP = "signUp",
    NOT_FOUND = "notFound"
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.AUTH]: '/auth',
    [AppRoutes.SIGN_UP]: '/signUp',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        element: <Auth />,
    },
    [AppRoutes.SIGN_UP]: {
        path: RoutePath.signUp,
        element: <SignUp />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.notFound,
        element: <NotFound />,
    },
};
