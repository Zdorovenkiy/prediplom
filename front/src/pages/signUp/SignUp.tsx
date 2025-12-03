import { ColorsEnum } from "@/constants/colors/ColorsEnum"
import { StyleList } from "@/constants/styles/StyleList"
import CustomBreadcrumbs from "@/features/customBreadcrumbs/CustomBreadcrumbs"
import CustomInput from "@/features/customInput/CustomInput"
import { useRegisterMutation } from "@/globalState/model/user/api/userApi"
import type { IUser } from "@/globalState/model/user/types/userType"
import { useNavigation } from "@/hooks/UseNavigation"
import { AppRoutes, RoutePath } from "@/routers/config/routeConfig"
import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"

type Props = {}

export default function SignUp({}: Props) {
    const navigate = useNavigation();

    const [formData, setFormData] = useState<IUser>({
        surname: '',
        name: '',
        patronymic: '',
        date: '',
        email: '',
        password: ''
    });

    const [register, { isSuccess, isError, isLoading }] = useRegisterMutation<{
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
        
        // Отправка запроса
        const response = await register(registerData).unwrap();
        
        // Успешная регистрация
        setFormSuccess('Регистрация успешна! Вы будете перенаправлены на страницу авторизации...');
        
        // Очистка формы
        setFormData({
            surname: '',
            name: '',
            patronymic: '',
            date: '',
            email: '',
            password: ''
        });
        
        } catch (error: any) {
        // Обработка ошибок от сервера
        const errorMessage = error?.data?.message || 'Произошла ошибка при регистрации';
        setFormError(errorMessage);
        }
    };
    
    return (
        <Box className="signUpPage" sx={StyleList.pages}>
            <Box className="container" sx={StyleList.pagesContainer}>
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
                            id='phone' 
                            label='Телефон'
                            full={true}
                            borderless={true}
                            type="text"
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