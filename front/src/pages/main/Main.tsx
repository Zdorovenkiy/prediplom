import { StyleList } from '@/constants/styles/StyleList';
import { Box, IconButton, Typography } from '@mui/material';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css'
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Swiper from './components/swiper/Swiper';
import ItemCard from '@/features/itemCard/ItemCard';
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs';
import { AppRoutes, RoutePath } from '@/routers/config/routeConfig';
import { useGetNewsImagesQuery } from '@/globalState/model/newsImages/api/newsImagesApi';

type Props = {}

export default function Main({}: Props) {
    const { data, isLoading, isError } = useGetNewsImagesQuery();
    return (
        <Box className="mainPage" sx={StyleList.pages}>
            <Box className="container" sx={StyleList.pagesContainer}>
                <CustomBreadcrumbs />
                <Swiper data={data} />

                <Box className="sale" sx={{textAlign: "start", width: "100%", display: 'flex', flexDirection: "column", gap: "20px"}}>
                    <Typography variant='h4'>
                        Акции и скидки
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: "space-between"}}>
                        <ItemCard />
                        <ItemCard />
                        <ItemCard />
                    </Box>

                </Box>
            </Box>
        </Box>
    )
}