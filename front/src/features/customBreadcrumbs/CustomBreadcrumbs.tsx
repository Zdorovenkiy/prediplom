import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, Typography } from '@mui/material';
import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { AppRoutes, RoutePath, RoutePathNames } from '@/routers/config/routeConfig'
import { useNavigation } from '@/hooks/UseNavigation';

type Props = {
    path?: AppRoutes[]
}

export default function CustomBreadcrumbs({path}: Props) {
    console.log("path", path);
    const navigate = useNavigation();
    
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
                // console.log(RoutePathNames[item]);
                
                return  <Typography 
                            onClick={() => navigate(RoutePath[item])} 
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