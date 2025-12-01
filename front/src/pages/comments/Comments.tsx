import { ColorsEnum } from '@/constants/colors/ColorsEnum'
import { StyleList } from '@/constants/styles/StyleList'
import CommentsCard from '@/features/commentsCard/CommentsCard'
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs'
import CustomInput from '@/features/customInput/CustomInput'
import { AppRoutes } from '@/routers/config/routeConfig'
import { Box, Button } from '@mui/material'
import React from 'react'

type Props = {}

export default function Comments({}: Props) {
    const reviews: Review[] = [
        {
        id: 1,
        author: 'Александр Петров',
        rating: 5,
        date: '15.12.2023',
        text: 'Отличный телефон! Камера просто супер, батареи хватает на целый день активного использования.',
        pros: 'Качество камеры, производительность, дизайн',
        cons: 'Высокая цена',
        verifiedPurchase: true
        },
        {
        id: 2,
        author: 'Мария Иванова',
        rating: 4,
        date: '10.12.2023',
        text: 'Хороший телефон, но тяжеловат. В остальном всё отлично.',
        pros: 'Экран, звук, камера',
        cons: 'Вес, цена',
        verifiedPurchase: true
        },
        {
        id: 3,
        author: 'Дмитрий Смирнов',
        rating: 5,
        date: '05.12.2023',
        text: 'Лучший iPhone на данный момент. Титан выглядит премиально.',
        pros: 'Материалы, производительность, камера',
        cons: 'Нет',
        verifiedPurchase: false
        }
    ]
    return (
        <Box className="CommentsPage" sx={StyleList.pages}>
            <Box className="container" sx={StyleList.pagesContainer}>
                <CustomBreadcrumbs path={[AppRoutes.ITEMS_LIST, AppRoutes.ITEM_PAGE, AppRoutes.COMMENTS]} /> 

                <Box 
                    className='comments' 
                    sx={{
                        width: '100%', 
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}
                >
                    <Box className='message' sx={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center'
                    }}>
                        <CustomInput 
                            label={'Комментарий'}
                            full
                            multiline
                            borderless
                            type='text'
                            id='comment'
                        />
                        <Button
                            variant="contained"
                            size="large"
                            // onClick={() => navigate(RoutePath.comments)}
                            sx={{ 
                                bgcolor: ColorsEnum.SECONDARY_BG_DARK,
                            }}
                        >
                            Отправить
                        </Button>
                    </Box>

                    {reviews.map((review) => (
                        <CommentsCard review={review} />
                    ))}

                </Box>
            </Box>
        </Box>
    )
}