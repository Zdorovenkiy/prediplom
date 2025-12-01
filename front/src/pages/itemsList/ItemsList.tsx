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
  Divider
} from '@mui/material'
import { Search, FilterList, ViewModule, ViewList, Clear, FilterAltOff } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { ColorsEnum } from '@/constants/colors/ColorsEnum'

type Product = {
  id: number
  name: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  rating: number
  isNew: boolean
  isSale: boolean
  inStock: boolean
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating'

type ViewMode = 'grid' | 'list'

type Props = {}

export default function ItemsList({}: Props) {
  // Состояния
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [page, setPage] = useState(1)
  const itemsPerPage = 12

  // Пример данных товаров
//   const products: Product[] = [
//     { id: 1, name: 'Смартфон Apple iPhone 15 Pro', price: 99990, originalPrice: 109990, discount: 10, image: '/images/iphone.jpg', category: 'Смартфоны', rating: 4.8, isNew: true, isSale: true, inStock: true },
//     { id: 2, name: 'Ноутбук ASUS ROG Strix', price: 149990, image: '/images/laptop.jpg', category: 'Ноутбуки', rating: 4.6, isNew: false, isSale: false, inStock: true },
//     { id: 3, name: 'Наушники Sony WH-1000XM5', price: 34990, discount: 15, image: '/images/headphones.jpg', category: 'Аудиотехника', rating: 4.9, isNew: true, isSale: true, inStock: true },
//     { id: 4, name: 'Фотокамера Canon EOS R6', price: 219990, image: '/images/camera.jpg', category: 'Фототехника', rating: 4.7, isNew: false, isSale: false, inStock: false },
//     { id: 5, name: 'Умные часы Apple Watch Series 9', price: 45990, originalPrice: 49990, discount: 8, image: '/images/watch.jpg', category: 'Гаджеты', rating: 4.5, isNew: true, isSale: true, inStock: true },
//     { id: 6, name: 'Планшет Samsung Galaxy Tab S9', price: 89990, image: '/images/tablet.jpg', category: 'Планшеты', rating: 4.4, isNew: false, isSale: false, inStock: true },
//     { id: 7, name: 'Игровая консоль PlayStation 5', price: 64990, discount: 5, image: '/images/console.jpg', category: 'Игровые консоли', rating: 4.9, isNew: false, isSale: true, inStock: true },
//     { id: 8, name: 'Телевизор LG OLED C3', price: 199990, originalPrice: 229990, discount: 13, image: '/images/tv.jpg', category: 'Телевизоры', rating: 4.8, isNew: true, isSale: true, inStock: true },
//   ]

  const products: Product[] = []

  // Фильтрация и сортировка
//   const filteredProducts = products
//     .filter(product => {
//       // Поиск по названию
//       if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
//         return false
//       }
      
//       // Фильтр по категориям
//       if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
//         return false
//       }
      
//       // Фильтр по цене
//       if (product.price < priceRange[0] || product.price > priceRange[1]) {
//         return false
//       }
      
//       return true
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case 'price-asc':
//           return a.price - b.price
//         case 'price-desc':
//           return b.price - a.price
//         case 'name-asc':
//           return a.name.localeCompare(b.name)
//         case 'name-desc':
//           return b.name.localeCompare(a.name)
//         case 'rating':
//           return b.rating - a.rating
//         default:
//           return 0
//       }
//     })

  // Пагинация
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  // Обработчики
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
    setPage(1)
  }

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number])
    setPage(1)
  }

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SortOption)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setPage(1)
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategories([])
    setPriceRange([0, 10000])
    setSortBy('default')
    setPage(1)
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    console.log("paginatedProducts", paginatedProducts);
    
  }, [paginatedProducts])

  return (
    <Box className="itemsListPage" sx={StyleList.pages}>
      <Box className="container" sx={StyleList.pagesContainer}>
        <CustomBreadcrumbs path={[AppRoutes.ITEMS_LIST]} />
        <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 3 }}>
          Каталог товаров
        </Typography>

        
            {paginatedProducts.length > 0 ? (
              <Box className={"list"} sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  {paginatedProducts.map(product => {
                    const md = viewMode === 'grid' ? 4 : 12;
                    const sm = viewMode === 'grid' ? 6 : 12
                    return <ItemCard key={product.id}
                        // product={product}
                        // viewMode={viewMode}
                      />
                   
                })}

                {/* Пагинация */}
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