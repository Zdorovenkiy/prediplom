import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { StyleList } from '@/constants/styles/StyleList';
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs';
import CustomInput from '@/features/customInput/CustomInput';
import { useNavigation } from '@/hooks/UseNavigation';
import { useGetUserReviewsQuery, useUpdateReviewMutation, useDeleteReviewMutation } from '@/globalState/model/review/api/reviewApi';
import { AppRoutes, RoutePath } from '@/routers/config/routeConfig';
import { Box, Button, CircularProgress, Paper, Typography, Rating, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import type { IReview } from '@/globalState/model/review/types/reviewType';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';

type Props = {}

export default function MyReviews({}: Props) {
    const navigate = useNavigation();
    const userId = localStorage.getItem('id');
    const { data: reviews, isLoading, refetch } = useGetUserReviewsQuery({ userId: Number(userId) }, { skip: !userId });
    const [updateReview, { isSuccess: updateSuccess }] = useUpdateReviewMutation();
    const [deleteReview, { isSuccess: deleteSuccess }] = useDeleteReviewMutation();
    
    const [editingReview, setEditingReview] = useState<IReview | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editData, setEditData] = useState<Partial<IReview>>({});

    useEffect(() => {
        if (userId) {
            refetch();
        }
    }, [userId, refetch]);

    useEffect(() => {
        if (updateSuccess || deleteSuccess) {
            refetch();
            setEditDialogOpen(false);
            setEditingReview(null);
        }
    }, [updateSuccess, deleteSuccess, refetch]);

    const handleEdit = (review: IReview) => {
        setEditingReview(review);
        setEditData({ text: review.text, rating: review.rating });
        setEditDialogOpen(true);
    };

    const handleDelete = async (reviewId: number) => {
        if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
            await deleteReview({ id: reviewId });
        }
    };

    const handleSaveEdit = async () => {
        if (editingReview?.id) {
            await updateReview({ ...editData, id: editingReview.id });
        }
    };

    const handleCancelEdit = () => {
        setEditDialogOpen(false);
        setEditingReview(null);
        setEditData({});
    };

    if (isLoading) {
        return (
            <Box className="myReviewsPage" sx={StyleList.pages}>
                <Box className="container" sx={StyleList.pagesContainer}>
                    <CircularProgress />
                </Box>
            </Box>
        );
    }

    return (
        <Box className="myReviewsPage" sx={StyleList.pages}>
            <Box className="container" sx={StyleList.pagesContainer}>
                <CustomBreadcrumbs path={[AppRoutes.PROFILE, AppRoutes.MY_REVIEWS]} />

                <Typography variant="h4" sx={{ width: '100%', textAlign: 'start', mb: 2 }}>
                    Мои отзывы
                </Typography>

                {!reviews || reviews.length === 0 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            width: '100%',
                            p: 4,
                            bgcolor: ColorsEnum.MAIN_BG,
                            borderRadius: '12px',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            У вас пока нет отзывов
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Ваши отзывы о товарах будут отображаться здесь
                        </Typography>
                    </Paper>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                        {reviews.map((review: IReview) => (
                            <Paper
                                key={review.id}
                                elevation={0}
                                sx={{
                                    width: '100%',
                                    p: 3,
                                    bgcolor: ColorsEnum.MAIN_BG,
                                    borderRadius: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    border: `2px ${ColorsEnum.SECONDARY_BG_DARK} solid`
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                                        <Typography variant="h6">
                                            Товар #{review.product_id}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', textAlign: 'start' }}>
                                    {review.text || 'Текст отзыва не указан'}
                                </Typography>
                                <Button
                                    variant="text"
                                    sx={{ alignSelf: 'flex-start', color: ColorsEnum.SECONDARY_BG_DARK, paddingInline: 0 }}
                                    onClick={() => navigate(RoutePath.itemPage.replace(':id', String(review.product_id)))}
                                >
                                    Перейти к товару
                                </Button>
                            </Paper>
                        ))}
                    </Box>
                )}

                <Dialog
                    open={editDialogOpen}
                    onClose={handleCancelEdit}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: {
                            bgcolor: ColorsEnum.MAIN_BG,
                        }
                    }}
                >
                    <DialogTitle sx={{ color: ColorsEnum.MAIN_TEXT }}>
                        Редактировать отзыв
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            <Box>
                                <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                                    Оценка
                                </Typography>
                                <Rating
                                    value={editData.rating || 0}
                                    onChange={(_, newValue) => setEditData({ ...editData, rating: newValue || 0 })}
                                    size="large"
                                />
                            </Box>
                            <CustomInput
                                id="review-text"
                                label="Текст отзыва"
                                full={true}
                                multiline={true}
                                borderless={true}
                                value={editData.text || ''}
                                onChange={(e) => setEditData({ ...editData, text: e.target.value })}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelEdit} sx={{ color: ColorsEnum.MAIN_TEXT }}>
                            Отмена
                        </Button>
                        <Button
                            onClick={handleSaveEdit}
                            variant="contained"
                            sx={{ bgcolor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_TEXT }}
                        >
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    )
}

