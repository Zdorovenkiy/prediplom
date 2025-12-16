import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { Box, Paper, Typography, Grid, CircularProgress } from '@mui/material';
import { useGetDashboardStatsQuery } from '@/globalState/model/admin/api/adminApi';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';

type Props = {}

export default function Dashboard({}: Props) {
    const { data: stats, isLoading } = useGetDashboardStatsQuery(undefined, {
  refetchOnMountOrArgChange: true,
});

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    const statCards = [
        {
            title: 'Всего заказов',
            value: stats?.totalOrders || 0,
            icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
            color: ColorsEnum.SECONDARY_BG_DARK,
        },
        {
            title: 'Всего пользователей',
            value: stats?.totalUsers || 0,
            icon: <PeopleIcon sx={{ fontSize: 40 }} />,
            color: ColorsEnum.SECONDARY_BG_LIGHT,
        },
        {
            title: 'Всего товаров',
            value: stats?.totalProducts || 0,
            icon: <InventoryIcon sx={{ fontSize: 40 }} />,
            color: ColorsEnum.SECONDARY_BG_DARK,
        },
        {
            title: 'Общая выручка',
            value: `${stats?.totalRevenue || 0} ₽`,
            icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
            color: ColorsEnum.SECONDARY_BG_LIGHT,
        },
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, color: ColorsEnum.MAIN_TEXT }}>
                Дашборд
            </Typography>

            <Grid container spacing={3} sx={{ mb: 3 }}>
                {statCards.map((card, index) => (
                    <Grid sx={{xs: 12, sm:6, md: 3}} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                bgcolor: card.color,
                                color: ColorsEnum.SECONDARY_TEXT,
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                    {card.value}
                                </Typography>
                                {card.icon}
                            </Box>
                            <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                {card.title}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                <Grid sx={{xs: 12, md:6}}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            bgcolor: ColorsEnum.MAIN_BG,
                            borderRadius: '12px',
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2, color: ColorsEnum.MAIN_TEXT }}>
                            Последние заказы
                        </Typography>
                        <Typography variant="body2" sx={{ color: ColorsEnum.MAIN_TEXT, opacity: 0.7 }}>
                            {stats?.recentOrders?.length || 0} новых заказов за последние 24 часа
                        </Typography>
                    </Paper>
                </Grid>
                <Grid  sx={{xs: 12, md:6}} >
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            bgcolor: ColorsEnum.MAIN_BG,
                            borderRadius: '12px',
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2, color: ColorsEnum.MAIN_TEXT }}>
                            Требуют модерации
                        </Typography>
                        <Typography variant="body2" sx={{ color: ColorsEnum.MAIN_TEXT, opacity: 0.7 }}>
                            {stats?.pendingReviews || 0} отзывов ожидают модерации
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

