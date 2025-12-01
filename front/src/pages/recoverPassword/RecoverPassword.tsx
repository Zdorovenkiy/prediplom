import { ColorsEnum } from '@/constants/colors/ColorsEnum'
import { StyleList } from '@/constants/styles/StyleList'
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs'
import CustomInput from '@/features/customInput/CustomInput'
import { useNavigation } from '@/hooks/UseNavigation'
import { AppRoutes, RoutePath } from '@/routers/config/routeConfig'
import { Box, Typography, Button } from '@mui/material'

type Props = {}

export default function RecoverPassword({}: Props) {
    const navigate = useNavigation();
    
    return (
        <Box className="recoverPasswordPage" sx={StyleList.pages}>
            <Box className="container" sx={StyleList.pagesContainer}>
                <CustomBreadcrumbs path={[AppRoutes.RECOVER_PASSWORD]} />
                <Box 
                    className="recoverPassword"       
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={StyleList.form}
                    >
                        <Typography variant="h5">
                            Восстановление пароля
                        </Typography>
                        <CustomInput 
                            id='email' 
                            label='Email'
                            full={true}
                            borderless={true}
                            type="email"
                            required
                            />                        
                        <Button 
                            variant="contained"
                            sx={{bgcolor: ColorsEnum.SECONDARY_BG_LIGHT}}
                        >
                            Отправить
                        </Button>
                        <Typography 
                            onClick={() => navigate(RoutePath.auth)}
                            variant='body2' 
                            sx={{
                                cursor: 'pointer',
                                '&.MuiTypography-root:hover': {
                                    opacity: '0.5'
                                }
                            
                            }}
                        >
                            Вернуться к авторизации
                        </Typography> 
                </Box>
            </Box>
        </Box>
    )
}