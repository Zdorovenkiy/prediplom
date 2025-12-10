import { StyleList } from '@/constants/styles/StyleList'
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Divider,
  Card,
  CardContent
} from '@mui/material'
import { Delete, Add, Remove, ShoppingCart } from '@mui/icons-material'
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs'
import { AppRoutes, RoutePath } from '@/routers/config/routeConfig'
import { useNavigation } from '@/hooks/UseNavigation'
import { ColorsEnum } from '@/constants/colors/ColorsEnum'
import { useAppSelector } from '@/hooks/useAppSelector'
import type { StateSchema } from '@/globalState/types/stateSchema'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { orderAction } from '@/globalState/model/order/slice/orderSlice'
import { useCreateOrderMutation } from '@/globalState/model/order/api/userApi'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

type Props = {}

export default function Basket({}: Props) {
    const navigate = useNavigation();

    const user = useAppSelector((state: StateSchema) => state.user);

    const basket = useAppSelector((state: StateSchema) => state.order)

    const [cartItems, setCartItems] = useState(basket.products);
    const dispatch = useAppDispatch();

    const [create, { isSuccess, isError, isLoading, message }] = useCreateOrderMutation<{
        message: string;
        isSuccess: boolean;
        isError: boolean;
        isLoading: boolean;
    }>();

    useEffect(()=> {
        console.log("basket", basket);
        setCartItems(basket.products);
    }, [basket])

    const subtotal = cartItems?.reduce((sum, item) => sum + (item.price! * item.quantity!), 0) || 0
    const deliveryFee = 300
    const total = subtotal + deliveryFee;

    const handleQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return
        
        console.log(id, newQuantity);
        
        dispatch(orderAction.setQuantity({id: id, quantity: newQuantity}));
        dispatch(orderAction.setTotal(subtotal));
    }

    const handleRemoveItem = (id: number) => {
        dispatch(orderAction.removeProduct(id));
    }

    const handleCheckout = async () => {
        const resp = await create(basket);
        console.log(resp);
        
    }

    useEffect(() => {
        console.log("message", message);
        
        if (isSuccess) {
            dispatch(orderAction.removeAll());
        }
    }, [isLoading])

    return (
        <Box className="basketPage" sx={StyleList.pages}>
        <Box className="container" sx={StyleList.pagesContainer}>
            <CustomBreadcrumbs path={[AppRoutes.BASKET]} />
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Корзина товаров
            </Typography>

            {cartItems?.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <ShoppingCart sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Ваша корзина пуста
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Добавьте товары, чтобы сделать заказ
                </Typography>
                <Button variant="contained" sx={{bgcolor: ColorsEnum.SECONDARY_BG_DARK}} onClick={() => navigate(RoutePath.itemsList)}>
                    Перейти к покупкам
                </Button>
            </Box>
            ) : (
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                <Box sx={{ flex: 1 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{
                            bgcolor: ColorsEnum.MAIN_BG,
                            borderWidth: '2px', 
                            borderColor: ColorsEnum.SECONDARY_BG_DARK, 
                            borderStyle: "solid",
                        }}>
                        <TableHead>
                            <TableRow>
                            <TableCell>Товар</TableCell>
                            <TableCell align="center">Количество</TableCell>
                            <TableCell align="right">Цена</TableCell>
                            <TableCell align="right">Сумма</TableCell>
                            <TableCell align="center">Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems?.map((item) => (
                            <TableRow key={item.product_id}>
                                <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography variant="body1">{item.name}</Typography>
                                </Box>
                                </TableCell>
                                <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <IconButton
                                    size="small"
                                    onClick={() => handleQuantityChange(item.product_id!, item.quantity! - 1)}
                                    >
                                    <Remove />
                                    </IconButton>
                                    <TextField
                                    value={item.quantity}
                                    size="small"
                                    sx={{ width: 60, mx: 1 }}
                                    inputProps={{ 
                                        style: { textAlign: 'center' },
                                        min: 1
                                    }}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value)
                                        if (!isNaN(value)) {
                                        handleQuantityChange(item.product_id!, value)
                                        }
                                    }}
                                    />
                                    <IconButton
                                    size="small"
                                    onClick={() => handleQuantityChange(item.product_id!, item.quantity! + 1)}
                                    >
                                    <Add />
                                    </IconButton>
                                </Box>
                                </TableCell>
                                <TableCell align="right">
                                <Typography>{item.price?.toLocaleString('ru-RU')} ₽</Typography>
                                </TableCell>
                                <TableCell align="right">
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {(item.price! * item.quantity!).toLocaleString('ru-RU')} ₽
                                </Typography>
                                </TableCell>
                                <TableCell align="center">
                                <IconButton
                                    color="error"
                                    onClick={() => handleRemoveItem(item.product_id!)}
                                >
                                    <Delete />
                                </IconButton>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box sx={{ width: { 
                    xs: '100%',
                    md: 350,
                    borderWidth: '2px', 
                    borderColor: ColorsEnum.SECONDARY_BG_DARK, 
                    borderStyle: "solid",
                    bgcolor: ColorsEnum.MAIN_BG,
                }}}>
                    <Card sx={{
                        bgcolor: ColorsEnum.MAIN_BG
                    }}>
                        <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Итог заказа
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography color="text.secondary">Товары ({cartItems?.reduce((sum, item) => sum + item.quantity!, 0)})</Typography>
                            <Typography>{subtotal.toLocaleString('ru-RU')} ₽</Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography color="text.secondary">Доставка</Typography>
                            <Typography>{deliveryFee.toLocaleString('ru-RU')} ₽</Typography>
                        </Box>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6">Итого</Typography>
                            <Typography variant="h6" color="primary">
                            {total.toLocaleString('ru-RU')} ₽
                            </Typography>
                        </Box>
                        
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={handleCheckout}
                            disabled={!user.id}
                            sx={{md: 2, bgcolor: ColorsEnum.SECONDARY_BG_DARK}}
                        >
                            Перейти к оформлению
                        </Button>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            )}
        </Box>
        </Box>
    )
}