import { ColorsEnum } from '@/constants/colors/ColorsEnum'
import { StyleList } from '@/constants/styles/StyleList'
import CustomInput from '@/features/customInput/CustomInput'
import { RoutePath } from '@/routers/config/routeConfig'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'

type Props = {}

export default function Feedback({}: Props) {
    return (
        <Box 
            className="signUp"       
            component="form"
            noValidate
            autoComplete="off"
            sx={{...StyleList.form, height: 'fit-content'}}
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
                    id='email' 
                    label='Email'
                    full={true}
                    borderless={true}
                    type="email"
                    required
                    />
                <CustomInput 
                    id='title' 
                    label='Тема сообщения'
                    full={true}
                    borderless={true}
                    type="text"
                    required
                    />
                <CustomInput 
                    id='message' 
                    label='Сообщение'
                    full={true}
                    borderless={true}
                    type="text"
                    required
                    multiline
                    />
                
                <Button 
                    variant="contained"
                    sx={{bgcolor: ColorsEnum.SECONDARY_BG_LIGHT}}
                >
                    Отправить
                </Button>
        </Box>
    )
}