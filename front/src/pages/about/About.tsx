import { StyleList } from '@/constants/styles/StyleList';
import { Box, Typography, Grid, Paper, Container, Avatar } from '@mui/material';

import { 
  Storefront, 
  LocalShipping, 
  SupportAgent, 
  Security,
  Groups,
  Diversity3,
  Star
} from '@mui/icons-material';
import { ColorsEnum } from '@/constants/colors/ColorsEnum';

type Props = {};

export default function About({}: Props) {
  return (
    <Box className="aboutPage" sx={StyleList.pages}>
      <Container maxWidth="lg" sx={StyleList.pagesContainer}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ 
            fontWeight: 700,
            color: ColorsEnum.MAIN_TEXT
          }}>
            О нашем магазине
          </Typography>
          <Typography variant="h5" color={ColorsEnum.MAIN_TEXT} sx={{ maxWidth: 800, mx: 'auto' }}>
            Мы создаем уникальные возможности для наших клиентов с 2015 года
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={0} sx={{ 
                p: 4, 
                borderWidth: '2px', 
                borderColor: ColorsEnum.SECONDARY_BG_DARK, 
                borderStyle: "solid",
                bgcolor: ColorsEnum.MAIN_BG, 
                borderRadius: 2 
            }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Наша история
              </Typography>
              <Typography variant="body1" component={"p"}>
                Наш магазин начал свою работу в 2015 году с небольшого бутика в центре города. 
                За годы работы мы выросли в крупный онлайн-ритейлер с собственной логистической службой.
              </Typography>
              <Typography variant="body1" component={"p"}>
                Мы гордимся тем, что смогли создать сообщество довольных клиентов, которые возвращаются к нам снова и снова. 
                Наша миссия — делать качественные товары доступными для каждого.
              </Typography>
              <Typography variant="body1" component={"p"}>
                Сегодня в нашем ассортименте представлено более 10 000 товаров от проверенных производителей, 
                а наша команда насчитывает более 50 специалистов.
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ 
              backgroundColor: ColorsEnum.SECONDARY_BG_DARK, 
              color: 'white', 
              p: 4, 
              borderRadius: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Мы в цифрах
              </Typography>
              {[
                { label: 'Лет на рынке', value: '8+' },
                { label: 'Довольных клиентов', value: '50,000+' },
                { label: 'Товаров в каталоге', value: '10,000+' },
                { label: 'Партнеров', value: '200+' }
              ].map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography sx={{textAlign: "start"}}>{item.label}</Typography>
                  <Typography sx={{ fontWeight: 700 }}>{item.value}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" textAlign="center" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
            Наши ценности
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                icon: <Storefront sx={{ fontSize: 40, color: ColorsEnum.SECONDARY_BG_DARK }} />,
                title: 'Качество',
                description: 'Тщательно отбираем товары и работаем только с проверенными поставщиками'
              },
              {
                icon: <LocalShipping sx={{ fontSize: 40, color: ColorsEnum.SECONDARY_BG_DARK }} />,
                title: 'Быстрая доставка',
                description: 'Доставляем заказы в течение 1-3 дней по всей стране'
              },
              {
                icon: <SupportAgent sx={{ fontSize: 40, color: ColorsEnum.SECONDARY_BG_DARK }} />,
                title: 'Поддержка',
                description: 'Круглосуточная поддержка клиентов и помощь в выборе'
              },
              {
                icon: <Security sx={{ fontSize: 40, color: ColorsEnum.SECONDARY_BG_DARK }} />,
                title: 'Надежность',
                description: 'Гарантия на все товары и безопасные платежи'
              }
            ].map((value, index) => (
              <Grid size={{ xs: 12, md: 3, sm: 6 }} key={index}>
                <Paper elevation={0} sx={{ 
                    borderWidth: '2px', 
                    borderColor: ColorsEnum.SECONDARY_BG_DARK, 
                    borderStyle: "solid",
                    bgcolor: ColorsEnum.MAIN_BG, 
                    p: 3, 
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                    transition: 'transform 0.3s',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 3
                    }
                }}>
                  <Box sx={{ 
                    color: 'primary.main',
                    mb: 2
                  }}>
                    {value.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" textAlign="center" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
            Наша команда
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {[
              { name: 'Анна Петрова', role: 'Основатель и CEO', experience: '10 лет в ритейле' },
              { name: 'Иван Сидоров', role: 'Директор по закупкам', experience: '8 лет опыта' },
              { name: 'Мария Иванова', role: 'Руководитель клиентской службы', experience: '6 лет опыта' }
            ].map((member, index) => (
              <Grid size={{ xs: 12, md: 4, sm: 6 }} key={index}>
                <Paper elevation={0} sx={{ 
                    borderWidth: '2px', 
                    borderColor: ColorsEnum.SECONDARY_BG_DARK, 
                    borderStyle: "solid",
                    bgcolor: ColorsEnum.MAIN_BG, 
                    p: 3, 
                    textAlign: 'center',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      bgcolor: 'primary.main',
                      fontSize: 40
                    }}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.experience}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}