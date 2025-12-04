import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, Typography } from '@mui/material';
import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { AppRoutes, RoutePath, RoutePathNames } from '@/routers/config/routeConfig'
import { useNavigation } from '@/hooks/UseNavigation';

type Props = {
    id?: string[],
    path?: AppRoutes[]
}

export default function CustomBreadcrumbs({id, path}: Props) {
    const navigate = useNavigation();

    console.log(path, id);
    
    
    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{alignSelf: "self-start", fontSize: '16px'}}>
            <Typography 
                onClick={() => navigate(RoutePath.main)} 
                sx={{ 
                    color: ColorsEnum.MAIN_TEXT, 
                    fontSize: '16px',
                    cursor: 'pointer',
                    '&.MuiTypography-root:hover': {
                        opacity: '0.5'
                    }
                }}>
                    Главная
            </Typography>
            { path?.map((item) => {
                const route = RoutePath[item].includes(':id') && id?.length ? RoutePath[item].replace(':id', id[0]) : RoutePath[item];
                const currentId = RoutePath[item].includes(':id') && id?.length ? id?.shift() : undefined;
                return  <Typography 
                            onClick={() => navigate(route, currentId)} 
                            sx={{ 
                                color: ColorsEnum.MAIN_TEXT, 
                                fontSize: '16px',
                                cursor: 'pointer',
                                '&.MuiTypography-root:hover': {
                                    opacity: '0.5'
                                }
                            }}>
                                {RoutePathNames[item]}
                        </Typography>
            })}
        </Breadcrumbs>
    )
}