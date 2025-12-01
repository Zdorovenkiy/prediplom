
import About from '@/pages/about/About';
import Auth from '@/pages/auth/Auth';
import Contacts from '@/pages/contacts/Contacts';
import Main from '@/pages/main/Main';
import NotFound from '@/pages/notFound/NotFound';
import RecoverPassword from '@/pages/recoverPassword/RecoverPassword';
import SignUp from '@/pages/signUp/SignUp';
import type { RouteObject } from 'react-router-dom';

export enum AppRoutes {
    AUTH = "auth",
    SIGN_UP = "signUp",
    NOT_FOUND = "notFound",
    MAIN = "main",
    RECOVER_PASSWORD = "recoverPassword",
    ABOUT = "about",
    CONTACTS = "contacts",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.CONTACTS]: '/contacts',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.RECOVER_PASSWORD]: '/recoverPassword',
    [AppRoutes.AUTH]: '/auth',
    [AppRoutes.SIGN_UP]: '/signUp',
    [AppRoutes.MAIN]: '/',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
    [AppRoutes.CONTACTS]: {
        path: RoutePath.contacts,
        element: <Contacts />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <About />,
    },
    [AppRoutes.RECOVER_PASSWORD]: {
        path: RoutePath.recoverPassword,
        element: <RecoverPassword />,
    },
    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        element: <Auth />,
    },
    [AppRoutes.SIGN_UP]: {
        path: RoutePath.signUp,
        element: <SignUp />,
    },
        [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <Main />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.notFound,
        element: <NotFound />,
    },
};
