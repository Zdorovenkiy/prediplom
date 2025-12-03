import { ColorsEnum } from '@/constants/colors/ColorsEnum'
import { StyleList } from '@/constants/styles/StyleList'
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs'
import CustomInput from '@/features/customInput/CustomInput'
import { useRecoverMutation } from '@/globalState/model/user/api/userApi'
import type { IUser } from '@/globalState/model/user/types/userType'
import { useNavigation } from '@/hooks/UseNavigation'
import { AppRoutes, RoutePath } from '@/routers/config/routeConfig'
import { Box, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'

type Props = {}

export default function RecoverPassword({}: Props) {
    const navigate = useNavigation();

    const [recover, { isSuccess, isError, isLoading, message }] = useRecoverMutation<{
        message: string;
        isSuccess: boolean;
        isError: boolean;
        isLoading: boolean;
    }>();

    const [formData, setFormData] = useState<IUser>({
        email: ''
    });

    const handleInputChange = (field: keyof IUser, value: string) => {
        setFormData(prev => ({
        ...prev,
        [field]: value
    }))};

    const handleSubmit = async (e: React.FormEvent) => {
        try {
        e.preventDefault();
        
        const response = await recover({email: formData.email!});
        
        
        setFormData({
            email: '',
        });
        } catch (error: any) {
            const errorMessage = error?.data?.message || 'Произошла ошибка при регистрации';
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        if (isSuccess) {
        const timer = setTimeout(() => {
            navigate(RoutePath.auth);
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
        <Box className="recoverPasswordPage" sx={StyleList.pages}>
            <Box className="container" sx={StyleList.pagesContainer}>
                <CustomBreadcrumbs path={[AppRoutes.RECOVER_PASSWORD]} />
                <Box 
                    className="recoverPassword"       
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={StyleList.form}
                    onSubmit={handleSubmit}
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
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
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