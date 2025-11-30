import { ColorsEnum } from "@/constants/colors/ColorsEnum"
import { StyleList } from "@/constants/styles/StyleList"
import CustomInput from "@/features/customInput/CustomInput"
import { RoutePath } from "@/routers/config/routeConfig"
import { Box, Button, Typography } from "@mui/material"

type Props = {}

export default function SignUp({}: Props) {
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
                            Регистрация
                        </Typography>
                        <CustomInput 
                            id='surname' 
                            label='Фамилия'
                            full={true}
                            borderless={true}
                            type="text"
                            required
                            />
                        <CustomInput 
                            id='name' 
                            label='Имя'
                            full={true}
                            borderless={true}
                            type="text"
                            required
                            />
                        <CustomInput 
                            id='patronymic' 
                            label='Отчество'
                            full={true}
                            borderless={true}
                            type="text"
                            />
                        <CustomInput 
                            id='date' 
                            label=''
                            full={true}
                            borderless={true}
                            type="date"
                            required
                            />
                        <CustomInput 
                            id='email' 
                            label='Email'
                            full={true}
                            borderless={true}
                            type="email"
                            required
                            />
                        <CustomInput 
                            id='password' 
                            label='Пароль'
                            full={true}
                            borderless={true}
                            type="password"
                            required
                            />
                        
                        <Button 
                            variant="contained"
                            sx={{bgcolor: ColorsEnum.SECONDARY_BG_LIGHT}}
                        >
                            Отправить
                        </Button>
                </Box>
            </Box>
        </Box>
    )
}