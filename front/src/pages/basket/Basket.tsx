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
 
    const cartItems: CartItem[] = [
        { id: 1, name: 'Товар 1', price: 1000, quantity: 2, image: '/path/to/image1.jpg' },
        { id: 2, name: 'Товар 2', price: 2500, quantity: 1, image: '/path/to/image2.jpg' },
        { id: 3, name: 'Товар 3', price: 500, quantity: 3, image: '/path/to/image3.jpg' },
    ]

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const deliveryFee = 300
    const total = subtotal + deliveryFee

    const handleQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return
        // Здесь будет логика обновления количества
        console.log(`Изменение количества товара ${id} на ${newQuantity}`)
    }

    const handleRemoveItem = (id: number) => {
        // Здесь будет логика удаления товара
        console.log(`Удаление товара ${id}`)
    }

    const handleCheckout = () => {
        // Здесь будет логика оформления заказа
        console.log('Оформление заказа')
    }

    return (
        <Box className="mainPage" sx={StyleList.pages}>
        <Box className="container" sx={StyleList.pagesContainer}>
            <CustomBreadcrumbs path={[AppRoutes.BASKET]} />
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Корзина товаров
            </Typography>

            {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <ShoppingCart sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Ваша корзина пуста
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Добавьте товары, чтобы сделать заказ
                </Typography>
                <Button variant="contained" sx={{bgcolor: ColorsEnum.SECONDARY_BG_DARK}} onClick={() => navigate(RoutePath.main)}>
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
                            {cartItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box
                                    component="img"
                                    src={item.image}
                                    alt={item.name}
                                    sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                                    />
                                    <Typography variant="body1">{item.name}</Typography>
                                </Box>
                                </TableCell>
                                <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <IconButton
                                    size="small"
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
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
                                        handleQuantityChange(item.id, value)
                                        }
                                    }}
                                    />
                                    <IconButton
                                    size="small"
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    >
                                    <Add />
                                    </IconButton>
                                </Box>
                                </TableCell>
                                <TableCell align="right">
                                <Typography>{item.price.toLocaleString('ru-RU')} ₽</Typography>
                                </TableCell>
                                <TableCell align="right">
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                                </Typography>
                                </TableCell>
                                <TableCell align="center">
                                <IconButton
                                    color="error"
                                    onClick={() => handleRemoveItem(item.id)}
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
                            <Typography color="text.secondary">Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</Typography>
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