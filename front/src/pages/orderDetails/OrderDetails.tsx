import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { StyleList } from '@/constants/styles/StyleList';
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs';
import { useNavigation } from '@/hooks/UseNavigation';
import { useGetOrderQuery } from '@/globalState/model/order/api/userApi';
import { AppRoutes, RoutePath } from '@/routers/config/routeConfig';
import { Box, Button, CircularProgress, Paper, Typography, Chip, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { IProduct } from '@/globalState/model/product/types/productType';
import type { IOrderProduct } from '@/globalState/model/order/types/orderProductType';

type Props = {}

export default function OrderDetails({}: Props) {
    const navigate = useNavigation();
    const { id } = useParams<{ id: string }>();
    const { data: order, isLoading } = useGetOrderQuery({ id: Number(id) }, {
  refetchOnMountOrArgChange: true,
});

    if (isLoading) {
        return (
            <Box className="orderDetailsPage" sx={StyleList.pages}>
                <Box className="container" sx={StyleList.pagesContainer}>
                    <CircularProgress />
                </Box>
            </Box>
        );
    }

    if (!order) {
        return (
            <Box className="orderDetailsPage" sx={StyleList.pages}>
                <Box className="container" sx={StyleList.pagesContainer}>
                    <Typography variant="h6">Заказ не найден</Typography>
                    <Button onClick={() => navigate(RoutePath.orderHistory)}>
                        Вернуться к истории заказов
                    </Button>
                </Box>
            </Box>
        );
    }

    return (
        <Box className="orderDetailsPage" sx={StyleList.pages}>
            <Box className="container" sx={StyleList.pagesContainer}>
                <CustomBreadcrumbs path={[AppRoutes.PROFILE, AppRoutes.ORDER_HISTORY, AppRoutes.ORDER_DETAILS]} id={[id!]} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 3 }}>
                    <Typography variant="h4">
                        Заказ №{order.id}
                    </Typography>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate(RoutePath.orderHistory)}
                        sx={{ color: ColorsEnum.SECONDARY_BG_DARK }}
                    >
                        Назад к заказам
                    </Button>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'space-between', gap: '12px', width: '100%'}}>
                    <Box >
                            <Paper
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
                                <Typography variant="h6">Состав заказа</Typography>
                                <Divider />
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Товар</TableCell>
                                                <TableCell align="right">Количество</TableCell>
                                                <TableCell align="right">Цена</TableCell>
                                                <TableCell align="right">Сумма</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {order.order_products?.map((item: IOrderProduct, index: number) => {
                                                
                                                return <TableRow key={index}>
                                                    <TableCell>
                                                        {item.product?.title || `Товар ${item.product?.id}`}
                                                    </TableCell>
                                                    <TableCell align="right">{item.quantity}</TableCell>
                                                    <TableCell align="right">{item.product?.price} ₽</TableCell>
                                                    <TableCell align="right">
                                                        {(item.product?.price || 0) * (item.quantity || 0)} ₽
                                                    </TableCell>
                                                </TableRow>
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                    </Box>

                    <Box >
                        <Paper
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
                            <Typography variant="h6">Информация о заказе</Typography>
                            <Divider />
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                                        Статус оплаты
                                    </Typography>
                                    <Chip
                                        label={order.is_payed ? 'Оплачен' : 'Не оплачен'}
                                        sx={{
                                            bgcolor: order.is_payed ? ColorsEnum.SECONDARY_BG_LIGHT : ColorsEnum.MAIN_BG,
                                            color: ColorsEnum.MAIN_TEXT,
                                        }}
                                    />
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6">Итого:</Typography>
                                    <Typography variant="h6" sx={{ color: ColorsEnum.SECONDARY_BG_DARK }}>
                                        {order.total} ₽
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </Box>


            </Box>
        </Box>
    )
}

