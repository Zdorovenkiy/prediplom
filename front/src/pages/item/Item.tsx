import { StyleList } from '@/constants/styles/StyleList'
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs'
import ItemCard from '@/features/itemCard/ItemCard'
import { AppRoutes } from '@/routers/config/routeConfig'
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Paper,
  Rating,
  Chip,
  Divider,
  Tabs,
  Tab,
  TextField,
  Stack,
  Card,
  CardContent,
  Breadcrumbs,
  Link as MuiLink,
  Alert,
  Snackbar,
  Badge
} from '@mui/material'
import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  CompareArrows,
  LocalShipping,
  AssignmentReturn,
  VerifiedUser,
  Star,
  ChatBubbleOutline,
  Add,
  Remove,
  Facebook,
  Twitter,
  Instagram,
  Email,
  PhotoCamera
} from '@mui/icons-material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Swiper from '../main/components/swiper/Swiper'
import { ColorsEnum } from '@/constants/colors/ColorsEnum'
import Comments from './components/Comments'

type Product = {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  discount?: number
  images: string[]
  category: string
  subcategory: string
  rating: number
  reviewsCount: number
  isNew: boolean
  isSale: boolean
  inStock: boolean
  stockCount: number
  sku: string
  warranty: number // месяцев
  description: string
  shortDescription: string
  specifications: {
    [key: string]: string
  }
  relatedProducts: number[] // массив ID связанных товаров
}

type Review = {
  id: number
  author: string
  rating: number
  date: string
  text: string
  pros?: string
  cons?: string
  verifiedPurchase: boolean
}

type TabPanelProps = {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

type Props = {}

export default function Item({}: Props) {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  // Пример данных товара
  const product: Product = {
    id: 1,
    name: 'Смартфон Apple iPhone 15 Pro Max 256GB',
    brand: 'Apple',
    price: 124990,
    originalPrice: 139990,
    discount: 11,
    images: [
      'https://avatarko.ru/img/kartinka/14/zhivotnye_kot_13379.jpg',
      'https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg',
    ],
    category: 'Смартфоны',
    subcategory: 'Apple iPhone',
    rating: 4.8,
    reviewsCount: 127,
    isNew: true,
    isSale: true,
    inStock: true,
    stockCount: 23,
    sku: 'IP15PROMAX256',
    warranty: 12,
    description: 'iPhone 15 Pro Max — самый мощный iPhone в истории. Оснащён революционным чипом A17 Pro, титановым дизайном и самой продвинутой камерой, которая открывает новые возможности для фотографии и видеосъёмки.',
    shortDescription: 'Титановый дизайн, чип A17 Pro, камера 48 Мп',
    specifications: {
      'Экран': '6.7" Super Retina XDR, 2796x1290',
      'Процессор': 'Apple A17 Pro',
      'Память': '256 ГБ',
      'ОЗУ': '8 ГБ',
      'Камера': 'Основная: 48 Мп, сверхширокоугольная: 12 Мп, телефото: 12 Мп с 5x оптическим зумом',
      'Фронтальная камера': '12 Мп',
      'Батарея': '4422 мА·ч',
      'Зарядка': 'Быстрая зарядка 20W, беспроводная MagSafe',
      'Защита': 'Ceramic Shield, IP68',
      'ОС': 'iOS 17',
      'Цвет': 'Титановый синий',
      'Вес': '221 г',
      'Размеры': '159.9 x 76.7 x 8.25 мм'
    },
    relatedProducts: [2, 3, 4, 5]
  }

  // Пример отзывов
  const reviews: Review[] = [
    {
      id: 1,
      author: 'Александр Петров',
      rating: 5,
      date: '15.12.2023',
      text: 'Отличный телефон! Камера просто супер, батареи хватает на целый день активного использования.',
      pros: 'Качество камеры, производительность, дизайн',
      cons: 'Высокая цена',
      verifiedPurchase: true
    },
    {
      id: 2,
      author: 'Мария Иванова',
      rating: 4,
      date: '10.12.2023',
      text: 'Хороший телефон, но тяжеловат. В остальном всё отлично.',
      pros: 'Экран, звук, камера',
      cons: 'Вес, цена',
      verifiedPurchase: true
    },
    {
      id: 3,
      author: 'Дмитрий Смирнов',
      rating: 5,
      date: '05.12.2023',
      text: 'Лучший iPhone на данный момент. Титан выглядит премиально.',
      pros: 'Материалы, производительность, камера',
      cons: 'Нет',
      verifiedPurchase: false
    }
  ]

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleAddToCart = () => {
    // Логика добавления в корзину
    setSnackbarMessage(`Товар "${product.name}" добавлен в корзину`)
    setShowSnackbar(true)
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    setSnackbarMessage(isFavorite ? 'Товар удалён из избранного' : 'Товар добавлен в избранное')
    setShowSnackbar(true)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setSnackbarMessage('Ссылка скопирована в буфер обмена')
      setShowSnackbar(true)
    }
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity)
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    // Перенаправление в корзину
  }

  const ratingDistribution = {
    5: 85,
    4: 32,
    3: 8,
    2: 2,
    1: 0
  }

  return (
    <Box className="itemPage" sx={StyleList.pages}>
        <Box className="container" sx={StyleList.pagesContainer}>
            <CustomBreadcrumbs path={[AppRoutes.ITEMS_LIST, AppRoutes.ITEM_PAGE]} />

            <Box className="item" sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px', 
                justifyContent: 'center',
                width: '100%'
            }}>
                <Swiper />
                <Box className='desc' sx={{ 
                    width: '100%', 
                    display: 'flex',
                    flexDirection: 'column', 
                    gap: '12px', 
                    justifyContent: 'flex-start',
                    textAlign: 'start'
                }}>
                    <Typography variant="h4" gutterBottom>
                        {product.name}
                    </Typography>

                    <Typography variant="h3">
                        {product.price.toLocaleString('ru-RU')} ₽
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Rating value={product.rating} precision={0.1} readOnly />
                    <Typography variant="body2" color="text.secondary">
                        {product.rating} ({product.reviewsCount} отзывов)
                    </Typography>
                    </Box>

                    <Typography variant="body1">
                    {product.shortDescription}
                    </Typography>

                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Typography>Количество:</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1 }}>
                        <IconButton onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                        <Remove />
                        </IconButton>
                        <TextField
                        value={quantity}
                        size="small"
                        sx={{ width: 60 }}
                        slotProps={{htmlInput: {
                            min: 0,
                            max: product.stockCount,
                            style: { textAlign: 'center' },
                        }}}
                        onChange={(e) => {
                            const value = parseInt(e.target.value)
                            if (!isNaN(value) && value >= 1 && value <= product.stockCount) {
                            setQuantity(value)
                            }
                        }}
                        />
                        <IconButton onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stockCount}>
                        <Add />
                        </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Максимум: {product.stockCount} шт.
                    </Typography>
                    </Stack>

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<AddShoppingCart />}
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        sx={{ bgcolor: ColorsEnum.SECONDARY_BG_DARK  }}
                    >
                        В корзину
                    </Button>
                </Box>
                <Box className='tabs' sx={{
                    width: '100%', 
                    display: 'flex',
                    flexDirection: 'column', 
                    gap: '12px', 
                    justifyContent: 'flex-start',
                    textAlign: 'start'
                }}>
                    <Tabs value={activeTab} onChange={handleTabChange} centered>
                        <Tab label="Описание" />
                        <Tab label={`Отзывы (${product.reviewsCount})`} />
                    </Tabs>    
                    <Box sx={{ p: 3 }}>
                        <TabPanel value={activeTab} index={0}>
                            <Typography variant="body1">
                                {product.description}
                            </Typography>
                        </TabPanel>

                        <TabPanel value={activeTab} index={1}>
                            
                            <Box className='comments' sx={{
                                width: '100%', 
                                display: 'flex',
                                flexDirection: 'column', 
                                gap: '12px', 
                                justifyContent: 'flex-start',
                                textAlign: 'start'
                            }}>
                                {reviews.map((review) => (
                                    <Comments review={review} />
                                ))}
                            </Box>
                   
                        </TabPanel>
                    </Box>                        
                </Box>
            </Box>

        </Box>
    </Box>
  )
}