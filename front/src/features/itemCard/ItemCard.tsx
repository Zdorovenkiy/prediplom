import { Card, CardMedia, CardContent, Typography, CardActions, Button, IconButton, Box, CardActionArea, CircularProgress } from '@mui/material'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { useNavigation } from '@/hooks/UseNavigation';
import { RoutePath } from '@/routers/config/routeConfig';
import type { IProduct } from '@/globalState/model/product/types/productType';
import { orderAction } from '@/globalState/model/order/slice/orderSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import type { StateSchema } from '@/globalState/types/stateSchema';
import { OrderMaker } from '@/shared/orderMaker';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect } from 'react';
type Props = {
    product: IProduct,
    wishlist?: boolean
}

export default function ItemCard({product, wishlist}: Props) {
    const navigate = useNavigation();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state: StateSchema) => state.user);

    if (!product) {
      return <CircularProgress />
    }

    useEffect(() => {
        console.log("product", product);
        console.log("import.meta.env.VITE_PLACEHOLDER", import.meta.env.VITE_PLACEHOLDER);
        
        
    }, [product])

    return (
        <Card sx={{ width: '100%', maxWidth: 345, bgcolor: ColorsEnum.MAIN_BG }}>
            <CardActionArea disableRipple sx={{display: 'flex', flexDirection: "column", justifyContent: 'space-between', height: '100%', textAlign: 'start', padding: '12px'}}>
                <CardMedia
                    sx={{ height: 140, width: '100%' }}
                    image={(product?.images?.length && product.images[0].image) ? product.images[0].image : import.meta.env.VITE_PLACEHOLDER}
                    title="title"
                />
                <CardContent sx={{width: '100%'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0px'}}>
                        <Typography className='name' gutterBottom variant="h5" component="div">
                            {product.title}
                        </Typography>
                        <Typography className='price' gutterBottom variant="h6" component="div">
                            {product.price} руб
                        </Typography>
                    </Box>
                    <Typography className='desc' variant="body2" sx={{ color: 'text.secondary' }}>
                        {product.description_short}
                    </Typography>
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: "space-between", width: '100%'}}>
                    <Button 
                        size="small" 
                        variant='contained' 
                        sx={{bgcolor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_TEXT}}
                        onClick={() => navigate(`${RoutePath.itemPage.replace(':id', String(product.id))}`)}
                        >Посмотреть</Button>
                    <IconButton 
                        aria-label="basketIn"
                        onClick={() => {
                            dispatch(orderAction.setProducts(OrderMaker(product)))
                            dispatch(orderAction.setTotal(product.price!))
                        }}
                        >
                        <AddShoppingCartIcon sx={{color: ColorsEnum.MAIN_TEXT, fontSize: "48px"}} />
                    </IconButton>
                    { !wishlist && (
                        <IconButton 
                            aria-label="loved"
                            onClick={() => {
                                const storedJson = localStorage.getItem('wishlist');
                                const stored = storedJson ? JSON.parse(storedJson) : [];
                                localStorage.setItem('wishlist', JSON.stringify([...stored, product.id]));
                            }}
                            >
                            <FavoriteIcon sx={{color: ColorsEnum.MAIN_TEXT, fontSize: "48px"}} />
                        </IconButton>
                    )}
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
// localStorage.getItem('wishlist');