import { ColorsEnum } from "@/constants/colors/ColorsEnum"
import { StyleList } from "@/constants/styles/StyleList"
import CustomBreadcrumbs from "@/features/customBreadcrumbs/CustomBreadcrumbs"
import CustomInput from "@/features/customInput/CustomInput"
import { useRegisterMutation } from "@/globalState/model/user/api/userApi"
import type { IUser } from "@/globalState/model/user/types/userType"
import { useNavigation } from "@/hooks/UseNavigation"
import { AppRoutes, RoutePath } from "@/routers/config/routeConfig"
import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"

type Props = {}

export default function SignUp({}: Props) {
    const navigate = useNavigation();

    const [formData, setFormData] = useState<IUser>({
        surname: '',
        name: '',
        patronymic: '',
        phone: '',
        email: '',
        password: ''
    });

    const [register, { isSuccess, isError, isLoading, message }] = useRegisterMutation<{
        message: string;
        isSuccess: boolean;
        isError: boolean;
        isLoading: boolean;
    }>();

    const handleInputChange = (field: keyof IUser, value: string) => {
        setFormData(prev => ({
        ...prev,
        [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
        e.preventDefault();

        const registerData = {
            surname: formData.surname,
            name: formData.name,
            patronymic: formData.patronymic || undefined,
            phone: formData.phone,
            email: formData.email,
            password: formData.password
        };

        const response = await register(registerData);

        if (response.data?.role_id) {
            localStorage.setItem('token', String(response.data.role_id));
            localStorage.setItem('id', String(response.data.id));
        }

        setFormData({
            surname: '',
            name: '',
            patronymic: '',
            phone: '',
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
        <Box className="signUpPage" sx={StyleList.pages}>
            <Box className="container" sx={StyleList.pagesContainer} onSubmit={handleSubmit}>
                <CustomBreadcrumbs path={[AppRoutes.SIGN_UP]} />
                <Box 
                    className="signUp"       
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
                            value={formData.surname}
                            onChange={(e) => handleInputChange('surname', e.target.value)}
                            />
                        <CustomInput 
                            id='name' 
                            label='Имя'
                            full={true}
                            borderless={true}
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        <CustomInput 
                            id='patronymic' 
                            label='Отчество'
                            full={true}
                            borderless={true}
                            type="text"
                            value={formData.patronymic}
                            onChange={(e) => handleInputChange('patronymic', e.target.value)}
                            />
                        <CustomInput 
                            id='phone' 
                            label='Телефон'
                            full={true}
                            borderless={true}
                            type="text"
                            required
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                        <CustomInput 
                            id='email' 
                            label='Email'
                            full={true}
                            borderless={true}
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        <CustomInput 
                            id='password' 
                            label='Пароль'
                            full={true}
                            borderless={true}
                            type="password"
                            required
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