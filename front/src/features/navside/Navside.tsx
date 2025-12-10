import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { RoutePathNames, RoutePathNamesAdmin, RoutePathNamesAuth, RoutePathNamesUnauth } from '@/routers/config/routeConfig';
import { useNavigation } from '@/hooks/UseNavigation';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RoleEnum } from '@/globalState/model/role/types/roleType';
import type { StateSchema } from '@/globalState/types/stateSchema';

type Props = {
    toggleDrawer: (newOpen: boolean) => () => void,

}

export default function Navside({toggleDrawer}: Props) {
    const navigate = useNavigation();
    const user = useAppSelector((state: StateSchema) => state.user);
    const path = !user.id ? RoutePathNamesUnauth : user.role_id !== RoleEnum.USER ? RoutePathNamesAdmin : RoutePathNamesAuth;
    return (
        <Box sx={{ width: 250, color: ColorsEnum.SECONDARY_TEXT }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
            {Object.keys(path).map((text: any, index) => (

            <ListItem key={index} disablePadding onClick={() => navigate(path[text].path)}>
                <ListItemButton>
                <ListItemText primary={path[text].name} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        </Box>
    )
}