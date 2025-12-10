
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
import Profile from '@/pages/profile/Profile';
import OrderHistory from '@/pages/orderHistory/OrderHistory';
import OrderDetails from '@/pages/orderDetails/OrderDetails';
import MyReviews from '@/pages/myReviews/MyReviews';
import Wishlist from '@/pages/wishlist/Wishlist';
import Dashboard from '@/pages/admin/dashboard/Dashboard';
import AdminProducts from '@/pages/admin/products/AdminProducts';
import AdminOrders from '@/pages/admin/orders/AdminOrders';
import AdminReviews from '@/pages/admin/reviews/AdminReviews';
import AdminUsers from '@/pages/admin/users/AdminUsers';
import AdminConfig from '@/pages/admin/config/AdminConfig';
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
    PROFILE = "profile",
    ORDER_HISTORY = "orderHistory",
    ORDER_DETAILS = "orderDetails",
    MY_REVIEWS = "myReviews",
    WISHLIST = "wishlist",
    ADMIN_DASHBOARD = "adminDashboard",
    ADMIN_PRODUCTS = "adminProducts",
    ADMIN_ORDERS = "adminOrders",
    ADMIN_REVIEWS = "adminReviews",
    ADMIN_USERS = "adminUsers",
    ADMIN_CONFIG = "adminConfig",
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
    [AppRoutes.PROFILE]: 'Профиль',
    [AppRoutes.ORDER_HISTORY]: 'История заказов',
    [AppRoutes.ORDER_DETAILS]: 'Детали заказа',
    [AppRoutes.MY_REVIEWS]: 'Мои отзывы',
    [AppRoutes.WISHLIST]: 'Избранное',
    [AppRoutes.ADMIN_DASHBOARD]: 'Дашборд',
    [AppRoutes.ADMIN_PRODUCTS]: 'Управление товарами',
    [AppRoutes.ADMIN_ORDERS]: 'Управление заказами',
    [AppRoutes.ADMIN_REVIEWS]: 'Модерация отзывов',
    [AppRoutes.ADMIN_USERS]: 'Управление пользователями',
    [AppRoutes.ADMIN_CONFIG]: 'Конфигурация',
    [AppRoutes.MAIN]: 'Главная',
    [AppRoutes.NOT_FOUND]: '',
};

export const RoutePathNamesUnauth: Partial<Record<AppRoutes, {name: string, path: string}>> = {
    [AppRoutes.MAIN]: {name: 'Главная', path: '/'},
    [AppRoutes.ITEMS_LIST]: {name: 'Каталог', path: '/itemsList'},
    [AppRoutes.BASKET]: {name: 'Корзина', path: '/basket'},
    [AppRoutes.CONTACTS]: {name: 'Контакты', path: '/contacts'},
    [AppRoutes.ABOUT]:  {name: 'О нас', path: '/about'},
    [AppRoutes.AUTH]: {name: 'Авторизация', path: '/auth'},
    [AppRoutes.SIGN_UP]: {name: 'Регистрация', path: '/signUp'},
};

export const RoutePathNamesAuth: Partial<Record<AppRoutes, {name: string, path: string}>> = {
    [AppRoutes.MAIN]: {name: 'Главная', path: '/'},
    [AppRoutes.ITEMS_LIST]: {name: 'Каталог', path: '/itemsList'},
    [AppRoutes.BASKET]: {name: 'Корзина', path: '/basket'},
    [AppRoutes.CONTACTS]: {name: 'Контакты', path: '/contacts'},
    [AppRoutes.ABOUT]:  {name: 'О нас', path: '/about'},
    [AppRoutes.ORDER_HISTORY]: {name: 'История заказов', path: '/profile/orders'},
    [AppRoutes.MY_REVIEWS]: {name: 'Мои отзывы', path: '/profile/reviews'},
    [AppRoutes.WISHLIST]: {name: 'Избранное', path: '/profile/wishlist'},
    [AppRoutes.PROFILE]: {name: 'Профиль', path: '/profile'},
};

export const RoutePathNamesAdmin: Partial<Record<AppRoutes, {name: string, path: string}>> = {
    [AppRoutes.MAIN]: {name: 'Главная', path: '/'},
    [AppRoutes.ITEMS_LIST]: {name: 'Каталог', path: '/itemsList'},
    [AppRoutes.BASKET]: {name: 'Корзина', path: '/basket'},
    [AppRoutes.CONTACTS]: {name: 'Контакты', path: '/contacts'},
    [AppRoutes.ABOUT]:  {name: 'О нас', path: '/about'},
    [AppRoutes.ORDER_HISTORY]: {name: 'История заказов', path: '/profile/orders'},
    [AppRoutes.MY_REVIEWS]: {name: 'Мои отзывы', path: '/profile/reviews'},
    [AppRoutes.WISHLIST]: {name: 'Избранное', path: '/profile/wishlist'},
    [AppRoutes.PROFILE]: {name: 'Профиль', path: '/profile'},
    [AppRoutes.ADMIN_DASHBOARD]: {name: 'Дашборд', path: '/admin'},
    [AppRoutes.ADMIN_PRODUCTS]: {name: 'Управление товарами', path: '/admin/products'},
    [AppRoutes.ADMIN_ORDERS]: {name: 'Управление заказами', path: '/admin/orders'},
    [AppRoutes.ADMIN_REVIEWS]: {name: 'Модерация отзывов', path: '/admin/reviews'},
    [AppRoutes.ADMIN_USERS]: {name: 'Управление пользователями', path: '/admin/users'},
    [AppRoutes.ADMIN_CONFIG]: {name: 'Конфигурация', path: '/admin/config'},
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
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.ORDER_HISTORY]: '/profile/orders',
    [AppRoutes.ORDER_DETAILS]: '/profile/orders/:id',
    [AppRoutes.MY_REVIEWS]: '/profile/reviews',
    [AppRoutes.WISHLIST]: '/profile/wishlist',
    [AppRoutes.ADMIN_DASHBOARD]: '/admin',
    [AppRoutes.ADMIN_PRODUCTS]: '/admin/products',
    [AppRoutes.ADMIN_ORDERS]: '/admin/orders',
    [AppRoutes.ADMIN_REVIEWS]: '/admin/reviews',
    [AppRoutes.ADMIN_USERS]: '/admin/users',
    [AppRoutes.ADMIN_CONFIG]: '/admin/config',
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
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <Profile />,
    },
    [AppRoutes.ORDER_HISTORY]: {
        path: RoutePath.orderHistory,
        element: <OrderHistory />,
    },
    [AppRoutes.ORDER_DETAILS]: {
        path: RoutePath.orderDetails,
        element: <OrderDetails />,
    },
    [AppRoutes.MY_REVIEWS]: {
        path: RoutePath.myReviews,
        element: <MyReviews />,
    },
    [AppRoutes.WISHLIST]: {
        path: RoutePath.wishlist,
        element: <Wishlist />,
    },
    [AppRoutes.ADMIN_DASHBOARD]: {
        path: RoutePath.adminDashboard,
        element: <Dashboard />,
    },
    [AppRoutes.ADMIN_PRODUCTS]: {
        path: RoutePath.adminProducts,
        element: <AdminProducts />,
    },
    [AppRoutes.ADMIN_ORDERS]: {
        path: RoutePath.adminOrders,
        element: <AdminOrders />,
    },
    [AppRoutes.ADMIN_REVIEWS]: {
        path: RoutePath.adminReviews,
        element: <AdminReviews />,
    },
    [AppRoutes.ADMIN_USERS]: {
        path: RoutePath.adminUsers,
        element: <AdminUsers />,
    },
    [AppRoutes.ADMIN_CONFIG]: {
        path: RoutePath.adminConfig,
        element: <AdminConfig />,
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
