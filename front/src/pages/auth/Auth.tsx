import { ColorsEnum } from "@/constants/colors/ColorsEnum"
import { StyleList } from "@/constants/styles/StyleList"
import CustomInput from "@/features/customInput/CustomInput"
import { useNavigation } from "@/hooks/UseNavigation"
import { RoutePath } from "@/routers/config/routeConfig"
import { Box, Button, TextField, Typography } from "@mui/material"

type Props = {}

export default function Auth({}: Props) {
    const navigate = useNavigation();

    return (
        <Box className="AuthPage" sx={StyleList.pages}>
            <Box className="container" sx={StyleList.pagesContainer}>
                
                <Box 
                    className="auth"       
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={StyleList.form}
                    >
                        <Typography variant="h5">
                            Авторизация
                        </Typography>
                        <CustomInput 
                            id='email' 
                            label='Email'
                            full={true}
                            borderless={true}
                            type="email"
                            />

                        <CustomInput 
                            id='password' 
                            label='Пароль'
                            full={true}
                            borderless={true}
                            type="password"
                            />
                        
                        <Button 
                            variant="contained"
                            sx={{bgcolor: ColorsEnum.SECONDARY_BG_LIGHT}}
                        >
                            Отправить
                        </Button>
                        <Typography 
                            onClick={() => navigate(RoutePath.signUp)}
                            variant='body2' 
                            sx={{
                                cursor: 'pointer',
                                '&.MuiTypography-root:hover': {
                                    opacity: '0.5'
                                }
                            
                            }}
                        >
                            Зарегистрироваться
                        </Typography> 
                        <Typography 
                            onClick={() => navigate(RoutePath.recoverPassword)}
                            variant='body2' 
                            sx={{
                                cursor: 'pointer',
                                '&.MuiTypography-root:hover': {
                                    opacity: '0.5'
                                }
                            }}
                        >
                            Забыли пароль?
                        </Typography> 
                </Box>
            </Box>
        </Box>
    )
}