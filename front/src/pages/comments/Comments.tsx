import { ColorsEnum } from '@/constants/colors/ColorsEnum'
import { StyleList } from '@/constants/styles/StyleList'
import CommentsCard from '@/features/commentsCard/CommentsCard'
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs'
import CustomInput from '@/features/customInput/CustomInput'
import { useGetReviewQuery, useSendReviewMutation } from '@/globalState/model/review/api/reviewApi'
import type { IReview } from '@/globalState/model/review/types/reviewType'
import { AppRoutes } from '@/routers/config/routeConfig'
import { Box, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

export default function Comments({}: Props) {
    const { id } = useParams<{ id: string }>()
    const { data: reviews, isLoading, refetch } = useGetReviewQuery({id: +id!});

    const [send, { isSuccess, isError, isLoading: sendLoading, message }] = useSendReviewMutation<{
        message: string;
        isSuccess: boolean;
        isError: boolean;
        isLoading: boolean;
    }>();

    const [formData, setFormData] = useState<IReview>({
        product_id: Number(id),
        user_id: 1,
        rating: 0,
        text: '',
    });

    const handleInputChange = (field: keyof IReview, value: string) => {
        setFormData(prev => ({
        ...prev,
        [field]: value
    }))};    

    const handleSubmit = async (e: React.FormEvent) => {
        try {
        e.preventDefault();
        
        const authData = {...formData};
        
        const response = await send(authData);
        
        setFormData({
            product_id: Number(id),
            user_id: 1,
            rating: 0,
            text: '',
        });
        } catch (error: any) {
            const errorMessage = error?.data?.message || 'Произошла ошибка при регистрации';
            console.log(errorMessage);
        }
    };

    async function refresh() {
        await refetch();
    }

    useEffect(() => {
        if (isSuccess) {
            refresh();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            console.log("message", message);
        }
    }, [isError]);    

    if (isLoading) {
      return <CircularProgress />
    }

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
                    <Box 
                        className='message'
                        component="form"
                        onSubmit={handleSubmit} 
                        sx={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center'
                        }}
                    >
                        <CustomInput 
                            label={'Комментарий'}
                            full
                            multiline
                            borderless
                            type='text'
                            id='comment'
                            value={formData.text}
                            onChange={(e) => handleInputChange('text', e.target.value)}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ 
                                bgcolor: ColorsEnum.SECONDARY_BG_DARK,
                            }}
                            type="submit"
                            disabled={isLoading}
                        >
                            Отправить
                        </Button>
                    </Box>

                    {reviews?.map((review) => (
                        <CommentsCard review={review} />
                    ))}

                </Box>
            </Box>
        </Box>
    )
}