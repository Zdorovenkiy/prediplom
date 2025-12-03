import { StyleList } from '@/constants/styles/StyleList'
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs'
import ItemCard from '@/features/itemCard/ItemCard'
import { AppRoutes, RoutePath } from '@/routers/config/routeConfig'
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
import CommentsCard from '@/features/commentsCard/CommentsCard'
import { useNavigation } from '@/hooks/UseNavigation'
import { useGetProductQuery } from '@/globalState/model/product/api/productApi'

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
  const navigate = useNavigation();
  
  const [activeTab, setActiveTab] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const { data: product } = useGetProductQuery({id: +id!});



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

  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= product?.stock!) {
      setQuantity(newQuantity)
    }
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
                        {product?.title}
                    </Typography>

                    <Typography variant="h3">
                        {product?.price} ₽
                    </Typography>

                    <Typography variant="body1">
                        {product?.description_short}
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
                            max: product?.stock,
                            style: { textAlign: 'center' },
                        }}}
                        onChange={(e) => {
                            const value = parseInt(e.target.value)
                            if (!isNaN(value) && value >= 1 && value <= product?.stock!) {
                            setQuantity(value)
                            }
                        }}
                        />
                        <IconButton onClick={() => handleQuantityChange(1)} disabled={quantity >= product?.stock!}>
                        <Add />
                        </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Максимум: {product?.stock} шт.
                    </Typography>
                    </Stack>

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<AddShoppingCart />}
                        onClick={handleAddToCart}
                        disabled={!product?.stock}
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
                        {/* <Tab label={`Отзывы (${product.reviewsCount})`} /> */}
                        <Tab label={`Отзывы (todo)`} />
                    </Tabs>    
                    <Box sx={{ p: 3 }}>
                        <TabPanel value={activeTab} index={0}>
                            <Typography variant="body1">
                                {product?.description}
                            </Typography>
                        </TabPanel>

                        <TabPanel value={activeTab} index={1}>
                            <Box className='comments' sx={{
                                width: '100%', 
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mb: 2,
                            }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => navigate(RoutePath.comments)}
                                    sx={{ 
                                        bgcolor: ColorsEnum.SECONDARY_BG_LIGHT, 
                                        color: ColorsEnum.SECONDARY_BG_DARK,
                                    }}
                                >
                                    Смотреть все
                                </Button>
                            </Box>
                            <Box className='comments' sx={{
                                width: '100%', 
                                display: 'flex',
                                flexDirection: 'column', 
                                gap: '12px', 
                                justifyContent: 'flex-start',
                                textAlign: 'start'
                            }}>
                                {reviews.map((review) => (
                                    <CommentsCard review={review} />
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