import { Box, Drawer, IconButton } from '@mui/material'
import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { StyleList } from '@/constants/styles/StyleList';
import { RoutePath, AppRoutes } from '@/routers/config/routeConfig';
import CustomInput from '../customInput/CustomInput';
import { useNavigation } from '@/hooks/UseNavigation';
import { useEffect, useState } from 'react';
import Navside from '../navside/Navside';
import { useAppSelector } from '@/hooks/useAppSelector';
import type { StateSchema } from '@/globalState/types/stateSchema';
import LoginIcon from '@mui/icons-material/Login';
import { RoleEnum } from '@/globalState/model/role/types/roleType';

type Props = {}

export default function Header({}: Props) {
    const user = useAppSelector((state: StateSchema) => state.user);
    const navigate = useNavigation();
    const [open, setOpen] = useState(false);
    const hasUser = Boolean(user?.id || localStorage.getItem('id'));
    const [isAdmin, setIsAdmin] = useState(false);
    
    useEffect(() => {
        console.log("useradsfasdf", user);
        
        const roleId = user?.role_id;
        const tokenRole = localStorage.getItem('role');
        console.log("roleId", roleId);
        console.log("tokenRole", tokenRole);
        if (roleId) {
            setIsAdmin(roleId !== RoleEnum.USER);
        } else if (tokenRole) {
            setIsAdmin(tokenRole !== String(RoleEnum.USER));
        } else {
            setIsAdmin(false)
        }
    }, [user])

    useEffect(() => {
        console.log("isAdmin", isAdmin);

    }, [isAdmin])
    

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    
    return (
        <Box className="header" sx={{...StyleList.default, height: "100px"}}>
            <Box className="container" sx={StyleList.container}>
                <Box className="logo">
                    <IconButton aria-label="home" onClick={() => navigate(RoutePath.main)}>
                        <ImportContactsIcon sx={{color: ColorsEnum.SECONDARY_TEXT, fontSize: "48px"}} />
                    </IconButton>
                </Box>
                <Box className="search" sx={{flexGrow: "1"}}>
                </Box>
                <Box className="buttons">
                    <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon sx={{color: ColorsEnum.SECONDARY_TEXT, fontSize: "48px"}} />
                    </IconButton>
                    <IconButton aria-label="basket" onClick={() => navigate(RoutePath.basket)}>
                        <AddShoppingCartIcon sx={{color: ColorsEnum.SECONDARY_TEXT, fontSize: "48px"}} />
                    </IconButton>
                    {isAdmin && (
                        <IconButton aria-label="admin" onClick={() => navigate(RoutePath[AppRoutes.ADMIN_DASHBOARD])}>
                            <AdminPanelSettingsIcon sx={{color: ColorsEnum.SECONDARY_TEXT, fontSize: "48px"}} />
                        </IconButton>
                    )}
                    { hasUser ? (
                        <IconButton aria-label="profile" onClick={() => navigate(RoutePath.profile)}>
                            <AccountCircleIcon sx={{color: ColorsEnum.SECONDARY_TEXT, fontSize: "48px"}} />
                        </IconButton>
                    ) : (
                        <IconButton aria-label="auth" onClick={() => navigate(RoutePath.auth)}>
                            <LoginIcon sx={{color: ColorsEnum.SECONDARY_TEXT, fontSize: "48px"}} />
                        </IconButton>
                    )}
                </Box>
                <Drawer open={open} onClose={toggleDrawer(false)} slotProps={{paper: {style: {background: ColorsEnum.SECONDARY_BG_LIGHT, scrollbarWidth: 'none'}}}} >
                    <Navside toggleDrawer={toggleDrawer} />
                </Drawer>
            </Box>
        </Box>
    )
}