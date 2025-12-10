import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { StyleList } from '@/constants/styles/StyleList';
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs';
import { useNavigation } from '@/hooks/UseNavigation';
import { useGetOrdersQuery } from '@/globalState/model/order/api/userApi';
import { AppRoutes, RoutePath } from '@/routers/config/routeConfig';
import { Box, Button, CircularProgress, Paper, Typography, Chip, Divider } from '@mui/material';
import { useEffect } from 'react';
import type { IOrder } from '@/globalState/model/order/types/orderType';
import VisibilityIcon from '@mui/icons-material/Visibility';

type Props = {}

export default function OrderHistory({}: Props) {
    const navigate = useNavigation();
    const userId = localStorage.getItem('id');
    const { data: orders, isLoading, refetch } = useGetOrdersQuery({ userId: Number(userId) }, { skip: !userId });

    useEffect(() => {
        if (userId) {
            refetch();
        }
    }, [userId, refetch]);

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Дата не указана';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    if (isLoading) {
        return (
            <Box className="orderHistoryPage" sx={StyleList.pages}>
                <Box className="container" sx={StyleList.pagesContainer}>
                    <CircularProgress />
                </Box>
            </Box>
        );
    }

    return (
        <Box className="orderHistoryPage" sx={StyleList.pages}>
            <Box className="container" sx={StyleList.pagesContainer}>
                <CustomBreadcrumbs path={[AppRoutes.PROFILE, AppRoutes.ORDER_HISTORY]} />

                <Typography variant="h4" sx={{ width: '100%', textAlign: 'start', mb: 2 }}>
                    История заказов
                </Typography>

                {!orders || orders.length === 0 ? (
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
                            У вас пока нет заказов
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
                            Когда вы сделаете первый заказ, он появится здесь
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_TEXT }}
                            onClick={() => navigate(RoutePath.itemsList)}
                        >
                            Перейти в каталог
                        </Button>
                    </Paper>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                        {orders.map((order: IOrder) => (
                            <Paper
                                key={order.id}
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
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <Typography variant="h6">
                                            Заказ №{order.id}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                            {formatDate((order as any).createdAt || (order as any).created_at)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
                                        <Typography variant="h6" sx={{ color: ColorsEnum.SECONDARY_BG_DARK }}>
                                            {order.total} ₽
                                        </Typography>
                                        <Chip
                                            label={order.is_payed ? 'Оплачен' : 'Не оплачен'}
                                            sx={{
                                                bgcolor: order.is_payed ? ColorsEnum.SECONDARY_BG_LIGHT : ColorsEnum.MAIN_BG,
                                                color: ColorsEnum.MAIN_TEXT,
                                            }}
                                        />
                                    </Box>
                                </Box>

                                <Divider />

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        Товаров в заказе: {order.products?.length || 0}
                                    </Typography>
                                    {order.products?.slice(0, 3).map((product, index) => (
                                        <Typography key={index} variant="body2">
                                            • {product.name || `Товар ${product.product_id}`} × {product.quantity} шт.
                                        </Typography>
                                    ))}
                                    {order.products && order.products.length > 3 && (
                                        <Typography variant="body2" sx={{ opacity: 0.6 }}>
                                            ... и еще {order.products.length - 3} товаров
                                        </Typography>
                                    )}
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<VisibilityIcon />}
                                        sx={{ borderColor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_BG_DARK }}
                                        onClick={() => navigate(RoutePath.orderDetails.replace(':id', String(order.id)))}
                                    >
                                        Подробнее
                                    </Button>
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    )
}

