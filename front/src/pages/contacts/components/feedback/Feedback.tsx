import { ColorsEnum } from '@/constants/colors/ColorsEnum'
import { StyleList } from '@/constants/styles/StyleList'
import CustomInput from '@/features/customInput/CustomInput'
import { useSendFeedbackMutation } from '@/globalState/model/feedback/api/feedbackApi'
import type { IFeedback } from '@/globalState/model/feedback/types/feedbackType'
import { RoutePath } from '@/routers/config/routeConfig'
import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function Feedback({}: Props) {
    const [sendFeedback, { isSuccess, isError, isLoading, message }] = useSendFeedbackMutation<{
        message: string;
        isSuccess: boolean;
        isError: boolean;
        isLoading: boolean;
    }>();

    const [formData, setFormData] = useState<IFeedback>({
        surname: "",
        name: "",
        email: "",
        title: "",
        message: "",
    });

    const handleInputChange = (field: keyof IFeedback, value: string) => {
        setFormData(prev => ({
        ...prev,
        [field]: value
    }))};

    const handleSubmit = async (e: React.FormEvent) => {
        try {
        e.preventDefault();
        
        const authData = {...formData};
        
        await sendFeedback(authData);
        
        setFormData({
            surname: "",
            name: "",
            email: "",
            title: "",
            message: "",
        });
        } catch (error: any) {
            const errorMessage = error?.data?.message || 'Произошла ошибка при регистрации';
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        if (isError) {
            console.log("message", message);
        }
    }, [isError]);

    return (
        <Box 
            className="signUp"       
            component="form"
            noValidate
            autoComplete="off"
            sx={{...StyleList.form, height: 'fit-content'}}
            onSubmit={handleSubmit}
            >
                <Typography variant="h5">
                    Напишите нам
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
                    id='title' 
                    label='Тема сообщения'
                    full={true}
                    borderless={true}
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                <CustomInput 
                    id='message' 
                    label='Сообщение'
                    full={true}
                    borderless={true}
                    type="text"
                    required
                    multiline
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                
                <Button 
                    variant="contained"
                    sx={{bgcolor: ColorsEnum.SECONDARY_BG_LIGHT}}
                    type="submit"
                    disabled={isLoading}
                >
                    Отправить
                </Button>
        </Box>
    )
}