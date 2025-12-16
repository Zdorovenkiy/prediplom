import { StyleList } from '@/constants/styles/StyleList'
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs'
import ItemCard from '@/features/itemCard/ItemCard'
import { AppRoutes } from '@/routers/config/routeConfig'
import {
  Box,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Chip,
  Slider,
  Button,
  IconButton,
  Stack,
  type SelectChangeEvent,
  Pagination,
  Divider,
  CircularProgress
} from '@mui/material'
import { Search, FilterList, ViewModule, ViewList, Clear, FilterAltOff } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { ColorsEnum } from '@/constants/colors/ColorsEnum'
import { useGetProductsQuery } from '@/globalState/model/product/api/productApi'


type Props = {}

export default function ItemsList({}: Props) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 12

  const { data: products, isLoading } = useGetProductsQuery(undefined, {
  refetchOnMountOrArgChange: true,
});


  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 0
  const paginatedProducts = products ? products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  ) : [];

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    console.log("paginatedProducts", paginatedProducts);
    
  }, [paginatedProducts])

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Box className="itemsListPage" sx={StyleList.pages}>
      <Box className="container" sx={StyleList.pagesContainer}>
        <CustomBreadcrumbs path={[AppRoutes.ITEMS_LIST]} />
        <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 3 }}>
          Каталог товаров
        </Typography>

        
            {paginatedProducts.length > 0 ? (
                <Box className="listContainer"  sx={{display: 'grid', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <Box 
                        className="list"
                        sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
                        {paginatedProducts.map(product => {
                            return <ItemCard 
                                key={product.id}
                                product={product}
                            />
                        })}
                    </Box>
                    {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                        />
                    </Box>
                    )}
                </Box>
            ) : (
                <Box className={"list"} sx={{display: 'grid', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <Paper sx={{ p: 4, textAlign: 'center', bgcolor: ColorsEnum.MAIN_BG }}>
                        <Search sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                        Товары не найдены
                        </Typography>
                    </Paper>
              </Box>
            )}
        </Box>
    </Box>
  )
}