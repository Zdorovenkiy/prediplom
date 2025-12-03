
import About from '@/pages/about/About';
import Auth from '@/pages/auth/Auth';
import Basket from '@/pages/basket/Basket';
import Comments from '@/pages/comments/Comments';
import Contacts from '@/pages/contacts/Contacts';
import Item from '@/pages/item/Item';
import ItemsList from '@/pages/itemsList/ItemsList';
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
    BASKET = "basket",
    ITEMS_LIST = "itemsList",
    ITEM_PAGE = "itemPage",
    COMMENTS = "comments",
}

export const RoutePathNames: Record<AppRoutes, string> = {
    [AppRoutes.COMMENTS]: 'Комментарии',
    [AppRoutes.ITEM_PAGE]: 'Товар',
    [AppRoutes.ITEMS_LIST]: 'Каталог',
    [AppRoutes.BASKET]: 'Корзина',
    [AppRoutes.CONTACTS]: 'Контакты',
    [AppRoutes.ABOUT]: 'О нас',
    [AppRoutes.RECOVER_PASSWORD]: 'Востановление пароля',
    [AppRoutes.AUTH]: 'Авторизация',
    [AppRoutes.SIGN_UP]: 'Регистрация',
    [AppRoutes.MAIN]: 'Главная',
    [AppRoutes.NOT_FOUND]: '',
};

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.COMMENTS]: '/comments/:id',
    [AppRoutes.ITEM_PAGE]: '/itemPage/:id',
    [AppRoutes.ITEMS_LIST]: '/itemsList',
    [AppRoutes.BASKET]: '/basket',
    [AppRoutes.CONTACTS]: '/contacts',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.RECOVER_PASSWORD]: '/recoverPassword',
    [AppRoutes.AUTH]: '/auth',
    [AppRoutes.SIGN_UP]: '/signUp',
    [AppRoutes.MAIN]: '/',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
    [AppRoutes.COMMENTS]: {
        path: RoutePath.comments,
        element: <Comments />,
    },
    [AppRoutes.ITEM_PAGE]: {
        path: RoutePath.itemPage,
        element: <Item />,
    },
    [AppRoutes.ITEMS_LIST]: {
        path: RoutePath.itemsList,
        element: <ItemsList />,
    },
    [AppRoutes.BASKET]: {
        path: RoutePath.basket,
        element: <Basket />,
    },
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
