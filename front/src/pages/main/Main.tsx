import { StyleList } from '@/constants/styles/StyleList';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css'
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Swiper from './components/swiper/Swiper';
import ItemCard from '@/features/itemCard/ItemCard';
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs';
import { AppRoutes, RoutePath } from '@/routers/config/routeConfig';
import { useGetNewsImagesQuery } from '@/globalState/model/newsImages/api/newsImagesApi';
import { useGetDiscountsQuery } from '@/globalState/model/product/api/productApi';

type Props = {}

export default function Main({}: Props) {
    const { data } = useGetNewsImagesQuery();
    const { data: products, isLoading, isError } = useGetDiscountsQuery();

    if (isLoading) {
      return <CircularProgress />
    }

    return (
        <Box className="mainPage" sx={StyleList.pages}>
            <Box className="container" sx={StyleList.pagesContainer}>
                <CustomBreadcrumbs />
                <Swiper data={data} />

                <Box className="sale" sx={{textAlign: "start", width: "100%", display: 'flex', flexDirection: "column", gap: "20px"}}>
                    <Typography variant='h4'>
                        Акции и скидки
                    </Typography>
                    <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
                        { products?.map((product) => (
                            <ItemCard key={product.id} product={product} />
                        ))}
                    </Box>

                </Box>
            </Box>
        </Box>
    )
}