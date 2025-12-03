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
        <Card sx={{ maxWidth: 345, bgcolor: ColorsEnum.MAIN_BG }}>
            <CardActionArea disableRipple>
                <CardMedia
                    sx={{ height: 140 }}
                    image="https://imagekit.io/blog/content/images/2019/12/image-optimization.jpg"
                    title="title"
                />
                <CardContent>
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
                <CardActions sx={{display: 'flex', justifyContent: "space-between"}}>
                    <Button 
                        size="small" 
                        variant='contained' 
                        sx={{bgcolor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_TEXT}}
                        onClick={() => navigate(`${RoutePath.itemPage.replace(':id', '1')}`)}
                        >Посмотреть</Button>
                    <IconButton aria-label="basketIn">
                        <AddShoppingCartIcon sx={{color: ColorsEnum.MAIN_TEXT, fontSize: "48px"}} />
                    </IconButton>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}