import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import CustomInput from '@/features/customInput/CustomInput';
import { useGetAllReviewsQuery, useGenerateAIResponseMutation, useSendReviewResponseMutation, useDeleteReviewMutation } from '@/globalState/model/admin/api/adminApi';
import type { IReview } from '@/globalState/model/review/types/reviewType';
import { Box, Button, CircularProgress, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, Rating, IconButton, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useAppSelector } from '@/hooks/useAppSelector';

type Props = {}

export default function AdminReviews({}: Props) {
    const user = useAppSelector((state) => state.user);

    const { data: reviews, isLoading, refetch } = useGetAllReviewsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const [generateAIResponse] = useGenerateAIResponseMutation();
    const [sendReviewResponse] = useSendReviewResponseMutation();
    const [deleteReview] = useDeleteReviewMutation();
    
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<IReview | null>(null);
    const [responseText, setResponseText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleOpenDialog = (review: IReview) => {
        setSelectedReview(review);
        setResponseText('');
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedReview(null);
        setResponseText('');
    };

    const handleGenerateAI = async () => {
        if (!selectedReview) return;
        setIsGenerating(true);
        try {
            const result = await generateAIResponse({
                reviewId: selectedReview.id!,
                reviewText: selectedReview.text || '',
            });
            if (result.data?.response) {
                setResponseText(result.data.response);
            }
        } catch (error) {
            console.error('Ошибка при генерации ответа ИИ:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    useEffect(() => {
        console.log('user', user);
        
    }, [user])

    const handleSendResponse = async () => {
        if (!selectedReview || !responseText.trim()) return;
        try {
            console.log("user.id", user.id);
            
            await sendReviewResponse({
                reviewId: selectedReview.id!,
                responseText: responseText,
                user_id: user.id!
            });
            refetch();
            handleCloseDialog();
        } catch (error) {
            console.error('Ошибка при отправке ответа:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
            try {
                await deleteReview({ id });
                refetch();
            } catch (error) {
                console.error('Ошибка при удалении отзыва:', error);
            }
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, color: ColorsEnum.MAIN_TEXT }}>
                Модерация отзывов
            </Typography>

            <TableContainer component={Paper} elevation={0} sx={{ bgcolor: ColorsEnum.MAIN_BG, borderRadius: '12px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Товар ID</TableCell>
                            <TableCell>Пользователь</TableCell>
                            <TableCell>Рейтинг</TableCell>
                            <TableCell>Текст</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviews?.map((review) => (
                            <TableRow key={review.id}>
                                <TableCell>{review.id}</TableCell>
                                <TableCell>{review.product_id}</TableCell>
                                <TableCell>
                                    {review.user?.name || `ID: ${review.user_id}`}
                                </TableCell>
                                <TableCell>
                                    <Rating value={review.rating || 0} readOnly size="small" />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {review.text || 'Нет текста'}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        size="small"
                                        onClick={() => handleOpenDialog(review)}
                                        sx={{ color: ColorsEnum.SECONDARY_BG_DARK, mr: 1 }}
                                    >
                                        Ответить
                                    </Button>
                                    <IconButton
                                        size="small"
                                        onClick={() => review.id && handleDelete(review.id)}
                                        sx={{ color: ColorsEnum.SECONDARY_BG_DARK }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: ColorsEnum.MAIN_BG,
                    }
                }}
            >
                <DialogTitle sx={{ color: ColorsEnum.MAIN_TEXT }}>
                    Ответ на отзыв
                </DialogTitle>
                <DialogContent>
                    {selectedReview && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            <Paper sx={{ p: 2, bgcolor: ColorsEnum.SECONDARY_BG_LIGHT }}>
                                <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                                    Отзыв пользователя {selectedReview.user?.name || `ID: ${selectedReview.user_id}`}
                                </Typography>
                                <Rating value={selectedReview.rating || 0} readOnly size="small" sx={{ mb: 1 }} />
                                <Typography variant="body1">
                                    {selectedReview.text || 'Нет текста'}
                                </Typography>
                            </Paper>
                            <CustomInput
                                id="response"
                                label="Ответ на отзыв"
                                full={true}
                                multiline={true}
                                borderless={true}
                                value={responseText}
                                onChange={(e) => setResponseText(e.target.value)}
                            />
                            <Button
                                variant="outlined"
                                startIcon={<AutoAwesomeIcon />}
                                onClick={handleGenerateAI}
                                disabled={isGenerating}
                                sx={{ borderColor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_BG_DARK }}
                            >
                                {isGenerating ? 'Генерация...' : 'Сгенерировать ответ ИИ'}
                            </Button>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ color: ColorsEnum.MAIN_TEXT }}>
                        Отмена
                    </Button>
                    <Button
                        onClick={handleSendResponse}
                        variant="contained"
                        startIcon={<SendIcon />}
                        disabled={!responseText.trim()}
                        sx={{ bgcolor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_TEXT }}
                    >
                        Отправить ответ
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

