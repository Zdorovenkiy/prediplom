import { StyleList } from '@/constants/styles/StyleList';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Container, 
  TextField, 
  Button,
  Link,
  IconButton
} from '@mui/material';
import { 
  Phone, 
  Email, 
  LocationOn, 
  Schedule,
  Facebook,
  Instagram,
  Twitter,
  Telegram,
  WhatsApp
} from '@mui/icons-material';
import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import Feedback from './components/feedback/Feedback';

type Props = {};

export default function Contacts({}: Props) {
    return (
        <Box className="contactsPage" sx={StyleList.pages}>
            <Box className={"container"} sx={StyleList.pagesContainer}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ 
                    fontWeight: 700,
                    color: ColorsEnum.MAIN_TEXT
                }}>
                    Контакты
                </Typography>
                <Typography variant="h5" sx={{ maxWidth: 800, mx: 'auto', color: ColorsEnum.MAIN_TEXT }}>
                    Свяжитесь с нами любым удобным способом
                </Typography>
                </Box>

                <Grid container flexDirection={"row"} justifyContent={'space-between'} gap={4}>
                    <Grid sx={{
                        xs: 12, 
                        md: 6,
                        p: 2,
                        borderWidth: '3px', 
                        borderColor: ColorsEnum.SECONDARY_BG_DARK, 
                        borderStyle: "solid", 
                        borderRadius: 2,
                    }}>
                        <Paper elevation={0} sx={{  
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: ColorsEnum.MAIN_BG, 

                        }}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                                Наши контакты
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3, width: '100%' }}>
                                <LocationOn sx={{ mr: 2, mt: 0.5, color: ColorsEnum.SECONDARY_BG_DARK }} />
                                <Box sx={{width: '100%'}}>
                                <Typography variant="h6" gutterBottom>
                                    Адрес
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    г. Москва, ул. Примерная, д. 10
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Ближайшая станция метро: "Центральная"
                                </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3, width: '100%' }}>
                                <Phone color="primary" sx={{ mr: 2, mt: 0.5, color: ColorsEnum.SECONDARY_BG_DARK  }} />
                                <Box sx={{width: '100%'}}>
                                <Typography variant="h6" gutterBottom>
                                    Телефоны
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    +7 (495) 123-45-67
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    +7 (800) 123-45-68 (бесплатно по России)
                                </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3, width: '100%' }}>
                                <Email color="primary" sx={{ mr: 2, mt: 0.5, color: ColorsEnum.SECONDARY_BG_DARK  }} />
                                <Box sx={{width: '100%'}}>
                                <Typography variant="h6" gutterBottom>
                                    Email
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    info@ourstore.com
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    support@ourstore.com
                                </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3, width: '100%' }}>
                                <Schedule color="primary" sx={{ mr: 2, mt: 0.5, color: ColorsEnum.SECONDARY_BG_DARK  }} />
                                <Box sx={{width: '100%'}}>
                                <Typography variant="h6" gutterBottom>
                                    Режим работы
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Понедельник - Пятница: 9:00 - 20:00
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Суббота - Воскресенье: 10:00 - 18:00
                                </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 4, width: '100%' }}>
                                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                                Мы в социальных сетях
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
                                <IconButton 
                                    href="https://facebook.com" 
                                    target="_blank"
                                    sx={{ 
                                    backgroundColor: ColorsEnum.SECONDARY_BG_DARK, 
                                    color: 'white',
                                    '&:hover': { backgroundColor: ColorsEnum.SECONDARY_BG_LIGHT }
                                    }}
                                >
                                    <Facebook />
                                </IconButton>
                                <IconButton 
                                    href="https://instagram.com" 
                                    target="_blank"
                                    sx={{ 
                                    backgroundColor: ColorsEnum.SECONDARY_BG_DARK, 
                                    color: 'white',
                                    '&:hover': { backgroundColor: ColorsEnum.SECONDARY_BG_LIGHT }
                                    }}
                                >
                                    <Instagram />
                                </IconButton>
                                <IconButton 
                                    href="https://twitter.com" 
                                    target="_blank"
                                    sx={{ 
                                    backgroundColor: ColorsEnum.SECONDARY_BG_DARK, 
                                    color: 'white',
                                    '&:hover': { backgroundColor: ColorsEnum.SECONDARY_BG_LIGHT }
                                    }}
                                >
                                    <Twitter />
                                </IconButton>
                                <IconButton 
                                    href="https://t.me" 
                                    target="_blank"
                                    sx={{ 
                                    backgroundColor: ColorsEnum.SECONDARY_BG_DARK, 
                                    color: 'white',
                                    '&:hover': { backgroundColor: ColorsEnum.SECONDARY_BG_LIGHT }
                                    }}
                                >
                                    <Telegram />
                                </IconButton>
                                <IconButton 
                                    href="https://wa.me" 
                                    target="_blank"
                                    sx={{ 
                                    backgroundColor: ColorsEnum.SECONDARY_BG_DARK, 
                                    color: 'white',
                                    '&:hover': { backgroundColor: ColorsEnum.SECONDARY_BG_LIGHT }
                                    }}
                                >
                                    <WhatsApp />
                                </IconButton>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid sx={{
                        xs: 12, 
                        md: 6,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px'
                    }}>
                        <Feedback />

                        <Box sx={{ 
                            p: 3, 
                            backgroundColor: ColorsEnum.SECONDARY_BG_DARK, 
                            color: ColorsEnum.SECONDARY_TEXT, 
                            borderRadius: 2,
                            height: 'fit-content',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            width: "500px"
                        }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                Служба поддержки
                            </Typography>
                            <Typography variant="body1">
                                Наша служба поддержки работает круглосуточно 7 дней в неделю.
                            </Typography>
                            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                                Чат поддержки
                            </Typography>
                            <Typography variant="body1">
                                Онлайн-чат доступен в правом нижнем углу экрана
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Экстренная связь
                            </Typography>
                            <Typography variant="body1">
                                Для экстренных случаев: +7 (999) 123-45-67
                            </Typography>
                        </Box>
                    </Grid>                
                </Grid>
            </Box>
        </Box>
    );
}