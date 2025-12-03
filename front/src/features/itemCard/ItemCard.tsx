import { Card, CardMedia, CardContent, Typography, CardActions, Button, IconButton, Box, CardActionArea, CircularProgress } from '@mui/material'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { useNavigation } from '@/hooks/UseNavigation';
import { RoutePath } from '@/routers/config/routeConfig';
import type { IProduct } from '@/globalState/model/product/types/productType';

type Props = {
    product: IProduct
}

export default function ItemCard({product}: Props) {
    const navigate = useNavigation();

    if (!product) {
      return <CircularProgress />
    }

    return (
        <Card sx={{ width: '100%', maxWidth: 345, bgcolor: ColorsEnum.MAIN_BG }}>
            <CardActionArea disableRipple sx={{display: 'flex', flexDirection: "column", justifyContent: 'space-between', height: '100%', textAlign: 'start', padding: '12px'}}>
                <CardMedia
                    sx={{ height: 140, width: '100%' }}
                    image={product?.images?.length ? product.images[0].image : import.meta.env.VITE_PLACEHOLDER}
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
                    <IconButton aria-label="basketIn">
                        <AddShoppingCartIcon sx={{color: ColorsEnum.MAIN_TEXT, fontSize: "48px"}} />
                    </IconButton>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}