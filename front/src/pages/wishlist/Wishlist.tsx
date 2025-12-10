import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { StyleList } from '@/constants/styles/StyleList';
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs';
import ItemCard from '@/features/itemCard/ItemCard';
import { useNavigation } from '@/hooks/UseNavigation';
import { useGetProductsQuery } from '@/globalState/model/product/api/productApi';
import { AppRoutes, RoutePath } from '@/routers/config/routeConfig';
import { Box, Button, CircularProgress, Paper, Typography, Grid, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import type { IProduct } from '@/globalState/model/product/types/productType';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type Props = {}

export default function Wishlist({}: Props) {
    const navigate = useNavigation();
    const { data: allProducts, isLoading } = useGetProductsQuery();
    const [wishlist, setWishlist] = useState<number[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('wishlist');
        if (stored) {
            try {
                setWishlist(JSON.parse(stored));
            } catch {
                setWishlist([]);
            }
        }
    }, []);

    useEffect(() => {
        if (wishlist.length > 0) {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        } else {
            localStorage.removeItem('wishlist');
        }
    }, [wishlist]);

    const toggleWishlist = (productId: number) => {
        setWishlist(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    const wishlistProducts = allProducts?.filter(product => 
        product.id && wishlist.includes(product.id)
    ) || [];

    if (isLoading) {
        return (
            <Box className="wishlistPage" sx={StyleList.pages}>
                <Box className="container" sx={StyleList.pagesContainer}>
                    <CircularProgress />
                </Box>
            </Box>
        );
    }

    return (
        <Box className="wishlistPage" sx={StyleList.pages}>
            <Box className="container" sx={StyleList.pagesContainer}>
                <CustomBreadcrumbs path={[AppRoutes.PROFILE, AppRoutes.WISHLIST]} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 2 }}>
                    <Typography variant="h4">
                        Избранное
                    </Typography>
                    {wishlistProducts.length > 0 && (
                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'товар' : 'товаров'}
                        </Typography>
                    )}
                </Box>

                {wishlistProducts.length === 0 ? (
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
                        <FavoriteBorderIcon sx={{ fontSize: 64, color: ColorsEnum.SECONDARY_BG_LIGHT, mb: 2 }} />
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Ваш список желаний пуст
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
                            Добавляйте товары в избранное, чтобы не потерять их
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
                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        {wishlistProducts.map((product: IProduct) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <Box sx={{ position: 'relative' }}>
                                    <ItemCard product={product} />
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            bgcolor: ColorsEnum.MAIN_BG,
                                            '&:hover': {
                                                bgcolor: ColorsEnum.SECONDARY_BG_LIGHT,
                                            },
                                        }}
                                        onClick={() => product.id && toggleWishlist(product.id)}
                                    >
                                        <FavoriteIcon sx={{ color: ColorsEnum.SECONDARY_BG_DARK }} />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    )
}

