import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { useGetAllOrdersQuery, useUpdateOrderMutation } from '@/globalState/model/admin/api/adminApi';
import type { IOrder } from '@/globalState/model/order/types/orderType';
import { Box, Button, CircularProgress, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';
import { useNavigation } from '@/hooks/UseNavigation';
import { RoutePath } from '@/routers/config/routeConfig';
import VisibilityIcon from '@mui/icons-material/Visibility';

type Props = {}

export default function AdminOrders({}: Props) {
    const navigate = useNavigation();
    const { data: orders, isLoading, refetch } = useGetAllOrdersQuery(undefined, {
  refetchOnMountOrArgChange: true,
});
    const [updateOrder] = useUpdateOrderMutation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

    const handleStatusChange = async (orderId: number, isPayed: boolean) => {
        try {
            await updateOrder({ id: orderId, is_payed: isPayed });
            refetch();
        } catch (error) {
            console.error('Ошибка при обновлении заказа:', error);
        }
    };

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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, color: ColorsEnum.MAIN_TEXT }}>
                Управление заказами
            </Typography>

            <TableContainer component={Paper} elevation={0} sx={{ bgcolor: ColorsEnum.MAIN_BG, borderRadius: '12px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Пользователь ID</TableCell>
                            <TableCell>Дата</TableCell>
                            <TableCell>Товаров</TableCell>
                            <TableCell>Сумма</TableCell>
                            <TableCell>Статус оплаты</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.user_id}</TableCell>
                                <TableCell>
                                    {formatDate((order as any).createdAt || (order as any).created_at)}
                                </TableCell>
                                <TableCell>{order.products?.length || 0}</TableCell>
                                <TableCell>{order.total} ₽</TableCell>
                                <TableCell>
                                    <FormControl size="small" sx={{ minWidth: 120 }}>
                                        <Select
                                            value={order.is_payed ? 'payed' : 'not_payed'}
                                            onChange={(e) => handleStatusChange(order.id!, e.target.value === 'payed')}
                                            sx={{
                                                bgcolor: ColorsEnum.MAIN_BG,
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: ColorsEnum.SECONDARY_BG_DARK,
                                                },
                                            }}
                                        >
                                            <MenuItem value="not_payed">Не оплачен</MenuItem>
                                            <MenuItem value="payed">Оплачен</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        size="small"
                                        startIcon={<VisibilityIcon />}
                                        onClick={() => navigate(RoutePath.orderDetails.replace(':id', String(order.id)))}
                                        sx={{ color: ColorsEnum.SECONDARY_BG_DARK }}
                                    >
                                        Подробнее
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

