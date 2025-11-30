import { ColorsEnum } from "@/constants/colors/ColorsEnum"
import { StyleList } from "@/constants/styles/StyleList"
import CustomInput from "@/features/customInput/CustomInput"
import { RoutePath } from "@/routers/config/routeConfig"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router"

type Props = {}

export default function Auth({}: Props) {
    const navigate = useNavigate();

    function navigateHandler(path: string) {
        navigate(path);
    }

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
                            onClick={() => navigateHandler(RoutePath.signUp)}
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