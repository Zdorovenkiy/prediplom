import { Card, CardMedia, CardContent, Typography, CardActions, Button, IconButton, Box, CardActionArea } from '@mui/material'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { useNavigation } from '@/hooks/UseNavigation';
import { RoutePath } from '@/routers/config/routeConfig';

type Props = {}

export default function ItemCard({}: Props) {
    const navigate = useNavigation();
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
                            Notebook
                        </Typography>
                        <Typography className='price' gutterBottom variant="h6" component="div">
                            50000 руб
                        </Typography>
                    </Box>
                    <Typography className='desc' variant="body2" sx={{ color: 'text.secondary' }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: "space-between"}}>
                    <Button 
                        size="small" 
                        variant='contained' 
                        sx={{bgcolor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_TEXT}}
                        onClick={() => navigate(RoutePath.itemsList)}
                        >Посмотреть</Button>
                    <IconButton aria-label="basketIn">
                        <AddShoppingCartIcon sx={{color: ColorsEnum.MAIN_TEXT, fontSize: "48px"}} />
                    </IconButton>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}