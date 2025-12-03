import { ColorsEnum } from "@/constants/colors/ColorsEnum"
import { StyleList } from "@/constants/styles/StyleList"
import CustomBreadcrumbs from "@/features/customBreadcrumbs/CustomBreadcrumbs"
import CustomInput from "@/features/customInput/CustomInput"
import { useAuthMutation } from "@/globalState/model/user/api/userApi"
import type { IUser } from "@/globalState/model/user/types/userType"
import { useNavigation } from "@/hooks/UseNavigation"
import { AppRoutes, RoutePath } from "@/routers/config/routeConfig"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

type Props = {}

export default function Auth({}: Props) {
    const navigate = useNavigation();

    const [auth, { isSuccess, isError, isLoading, message }] = useAuthMutation<{
        message: string;
        isSuccess: boolean;
        isError: boolean;
        isLoading: boolean;
    }>();

    const [formData, setFormData] = useState<IUser>({
        email: '',
        password: ''
    });
  
    const handleInputChange = (field: keyof IUser, value: string) => {
        setFormData(prev => ({
        ...prev,
        [field]: value
    }))};

    const handleSubmit = async (e: React.FormEvent) => {
        try {
        e.preventDefault();
        
        const authData = {
            email: formData.email,
            password: formData.password
        };
        
        const response = await auth(authData);
        
        if (response.data?.role_id) {
            localStorage.setItem('token', String(response.data.role_id));
            localStorage.setItem('id', String(response.data.id));
        }
        
        setFormData({
            email: '',
            password: ''
        });
        } catch (error: any) {
            const errorMessage = error?.data?.message || 'Произошла ошибка при регистрации';
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        if (isSuccess) {
        const timer = setTimeout(() => {
            navigate(RoutePath.main);
        }, 3000);
        
        return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (isError) {
            console.log("message", message);
        }
    }, [isError]);

    return (
        <Box className="AuthPage" sx={StyleList.pages}>
            <Box className="container" sx={StyleList.pagesContainer}>
                <CustomBreadcrumbs path={[AppRoutes.AUTH]} />
                <Box 
                    className="auth"       
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={StyleList.form}
                    onSubmit={handleSubmit}
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
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            />

                        <CustomInput 
                            id='password' 
                            label='Пароль'
                            full={true}
                            borderless={true}
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            />
                        
                        <Button 
                            variant="contained"
                            sx={{bgcolor: ColorsEnum.SECONDARY_BG_LIGHT}}
                            type="submit"
                            disabled={isLoading}
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