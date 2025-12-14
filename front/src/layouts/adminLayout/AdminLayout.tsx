import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, Avatar } from '@mui/material';
import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { useNavigation } from '@/hooks/UseNavigation';
import { RoutePath, AppRoutes } from '@/routers/config/routeConfig';
import { useAppSelector } from '@/hooks/useAppSelector';
import type { StateSchema } from '@/globalState/types/stateSchema';
import { RoleEnum } from '@/globalState/model/role/types/roleType';
import { useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import type { PropsWithChildren } from 'react';

const drawerWidth = 240;

const menuItems = [
    { text: 'Дашборд', icon: <DashboardIcon />, route: AppRoutes.ADMIN_DASHBOARD },
    { text: 'Товары', icon: <InventoryIcon />, route: AppRoutes.ADMIN_PRODUCTS },
    { text: 'Заказы', icon: <ShoppingCartIcon />, route: AppRoutes.ADMIN_ORDERS },
    { text: 'Отзывы', icon: <RateReviewIcon />, route: AppRoutes.ADMIN_REVIEWS },
    { text: 'Пользователи', icon: <PeopleIcon />, route: AppRoutes.ADMIN_USERS },
    { text: 'Конфигурация', icon: <SettingsIcon />, route: AppRoutes.ADMIN_CONFIG },
];

export default function AdminLayout({ children }: PropsWithChildren) {
    const navigate = useNavigation();
    const user = useAppSelector((state: StateSchema) => state.user);
    const isAdmin = user?.role_id !== RoleEnum.USER || localStorage.getItem('token') !== String(RoleEnum.USER);

    useEffect(() => {
        if (!isAdmin) {
            navigate(RoutePath.main);
        }
    }, [isAdmin, navigate]);

    if (!isAdmin) {
        return null;
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    bgcolor: ColorsEnum.SECONDARY_BG_DARK,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ color: ColorsEnum.SECONDARY_TEXT }}>
                        Админ-панель
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => navigate(RoutePath.main)}>
                        <Typography variant="body2" sx={{ color: ColorsEnum.SECONDARY_TEXT }}>
                            {user?.name || 'Администратор'}
                        </Typography>
                        <Avatar sx={{ bgcolor: ColorsEnum.SECONDARY_BG_LIGHT }}>
                            {(user?.name?.[0] || 'A').toUpperCase()}
                        </Avatar>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: ColorsEnum.SECONDARY_BG_LIGHT,
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar sx={{ bgcolor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_TEXT }}>
                    <Typography variant="h6" noWrap component="div">
                        Админ-панель
                    </Typography>
                </Toolbar>
                <List>
                    {menuItems.map((item) => {
                        console.log("item", item);
                        if (item.text === 'Пользователи' && user?.role_id !== RoleEnum.ADMIN) return;
                        
                        return <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                onClick={() => navigate(RoutePath[item.route])}
                                sx={{
                                    color: ColorsEnum.MAIN_TEXT,
                                    '&:hover': {
                                        bgcolor: ColorsEnum.SECONDARY_BG_DARK,
                                        color: ColorsEnum.SECONDARY_TEXT,
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    })}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: ColorsEnum.MAIN_BG,
                    p: 3,
                    width: `calc(100% - ${drawerWidth}px)`,
                    mt: '64px',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

