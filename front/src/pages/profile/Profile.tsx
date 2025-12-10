import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { StyleList } from '@/constants/styles/StyleList';
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs';
import CustomInput from '@/features/customInput/CustomInput';
import { useNavigation } from '@/hooks/UseNavigation';
import { useLazyGetUserQuery, useUpdateUserMutation } from '@/globalState/model/user/api/userApi';
import type { IUser } from '@/globalState/model/user/types/userType';
import { AppRoutes, RoutePath } from '@/routers/config/routeConfig';
import { Avatar, Box, Button, Chip, Divider, Paper, Typography, Tabs, Tab } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import HistoryIcon from '@mui/icons-material/History';
import RateReviewIcon from '@mui/icons-material/RateReview';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { userAction } from '@/globalState/model/user/slice/userSlice';

type Props = {}

export default function Profile({}: Props) {
    const navigate = useNavigation();
    const [fetchUser, { data, isLoading }] = useLazyGetUserQuery();
    const [updateUser, { isSuccess: updateSuccess }] = useUpdateUserMutation();
    const [profile, setProfile] = useState<Partial<IUser>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<Partial<IUser>>({});
    const [tabValue, setTabValue] = useState(0);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const storedId = localStorage.getItem('id');

        if (storedId) {
            fetchUser({ id: storedId });
        }
    }, [fetchUser]);

    useEffect(() => {
        if (data) {
            setProfile(data);
            setEditData(data);
        }
    }, [data]);

    useEffect(() => {
        if (updateSuccess) {
            setIsEditing(false);
            fetchUser({ id: String(profile.id) });
        }
    }, [updateSuccess]);

    const initials = useMemo(() => {
        const nameLetter = profile?.name?.[0] ?? '';
        const surnameLetter = profile?.surname?.[0] ?? '';
        return (nameLetter + surnameLetter || 'U').toUpperCase();
    }, [profile]);

    const shortName = profile?.name || profile?.surname
        ? `${profile?.name ?? ''} ${profile?.surname ?? ''}`.trim()
        : 'Гость';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        dispatch(userAction.clearUser());
        navigate(RoutePath.auth);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditData({ ...profile });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData({ ...profile });
    };

    const handleSave = async () => {
        if (profile.id) {
            await updateUser({ ...editData, id: profile.id });
        }
    };

    const handleInputChange = (field: keyof IUser, value: string) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const infoRows = [
        { label: 'Фамилия', field: 'surname' as keyof IUser, value: profile?.surname },
        { label: 'Имя', field: 'name' as keyof IUser, value: profile?.name },
        { label: 'Отчество', field: 'patronymic' as keyof IUser, value: profile?.patronymic },
        { label: 'Email', field: 'email' as keyof IUser, value: profile?.email },
        { label: 'Телефон', field: 'phone' as keyof IUser, value: profile?.phone },
    ];

    return (
        <Box className="profilePage" sx={StyleList.pages}>
            <Box className="container" sx={{ ...StyleList.pagesContainer, alignItems: 'stretch' }}>
                <CustomBreadcrumbs path={[AppRoutes.PROFILE]} />

                <Paper
                    elevation={0}
                    sx={{
                        width: '100%',
                        padding: '24px',
                        bgcolor: ColorsEnum.SECONDARY_BG_LIGHT,
                        color: ColorsEnum.MAIN_TEXT,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: '12px',
                        gap: '16px',
                        flexWrap: 'wrap',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        <Avatar
                            sx={{
                                bgcolor: ColorsEnum.SECONDARY_BG_DARK,
                                width: 72,
                                height: 72,
                                fontSize: '24px',
                                color: ColorsEnum.SECONDARY_TEXT,
                            }}
                        >
                            {initials}
                        </Avatar>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <Typography variant="h5">{shortName}</Typography>
                            <Typography variant="body1" sx={{ opacity: 0.8 }}>
                                {profile?.email || 'Почта не указана'}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {!isEditing ? (
                            <>
                                <Button
                                    variant="contained"
                                    sx={{ bgcolor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_TEXT }}
                                    onClick={handleEdit}
                                >
                                    Редактировать профиль
                                </Button>
                                <Button variant="outlined" sx={{ borderColor: ColorsEnum.SECONDARY_BG_DARK }} onClick={handleLogout}>
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="contained"
                                    sx={{ bgcolor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_TEXT }}
                                    onClick={handleSave}
                                >
                                    Сохранить
                                </Button>
                                <Button variant="outlined" sx={{ borderColor: ColorsEnum.SECONDARY_BG_DARK }} onClick={handleCancel}>
                                    Отмена
                                </Button>
                            </>
                        )}
                    </Box>
                </Paper>

                <Paper
                    elevation={0}
                    sx={{
                        width: '100%',
                        bgcolor: ColorsEnum.MAIN_BG,
                        borderRadius: '12px',
                        overflow: 'hidden',
                    }}
                >
                    <Tabs
                        value={tabValue}
                        onChange={(_, newValue) => setTabValue(newValue)}
                        sx={{
                            borderBottom: `1px solid ${ColorsEnum.SECONDARY_BG_LIGHT}`,
                            '& .MuiTab-root': {
                                color: ColorsEnum.MAIN_TEXT,
                                '&.Mui-selected': {
                                    color: ColorsEnum.SECONDARY_BG_DARK,
                                },
                            },
                        }}
                    >
                        <Tab label="Профиль" icon={<Avatar sx={{ width: 20, height: 20 }} />} iconPosition="start" />
                        <Tab 
                            label="История заказов" 
                            icon={<HistoryIcon />} 
                            iconPosition="start"
                            onClick={() => navigate(RoutePath[AppRoutes.ORDER_HISTORY])}
                        />
                        <Tab 
                            label="Мои отзывы" 
                            icon={<RateReviewIcon />} 
                            iconPosition="start"
                            onClick={() => navigate(RoutePath[AppRoutes.MY_REVIEWS])}
                        />
                        <Tab 
                            label="Избранное" 
                            icon={<FavoriteIcon />} 
                            iconPosition="start"
                            onClick={() => navigate(RoutePath[AppRoutes.WISHLIST])}
                        />
                    </Tabs>
                </Paper>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, width: '100%' }}>
                    <Box sx={{ width: { xs: '100%', md: '58%' } }}>
                        <Paper
                            elevation={0}
                            sx={{
                                width: '100%',
                                p: 3,
                                bgcolor: ColorsEnum.MAIN_BG,
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px',
                            }}
                        >
                            <Typography align='left' variant="h6">Личные данные</Typography>
                            <Divider />
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'self-start', gap: '16px' }}>
                                {infoRows.map((row) => (
                                    <Box
                                        key={row.label}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '8px',
                                            alignItems: 'self-start'
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                            {row.label}
                                        </Typography>
                                        {isEditing ? (
                                            <CustomInput
                                                id={row.field}
                                                label={row.label}
                                                full={true}
                                                borderless={true}
                                                value={editData[row.field] || ''}
                                                onChange={(e) => handleInputChange(row.field, e.target.value)}
                                            />
                                        ) : (
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {row.value || 'Не указано'}
                                            </Typography>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        </Paper>

                        <Paper
                            elevation={0}
                            sx={{
                                width: '100%',
                                p: 3,
                                mt: 2,
                                bgcolor: ColorsEnum.MAIN_BG,
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px',
                            }}
                        >
                        </Paper>
                    </Box>

                    <Box sx={{ width: { xs: '100%', md: '40%' } }}>
                        <Paper
                            elevation={0}
                            sx={{
                                width: '100%',
                                p: 3,
                                bgcolor: ColorsEnum.MAIN_BG,
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px',
                            }}
                        >
                        </Paper>

                        <Paper
                            elevation={0}
                            sx={{
                                width: '100%',
                                p: 3,
                                mt: 2,
                                bgcolor: ColorsEnum.MAIN_BG,
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            <Typography variant="h6">Поддержка</Typography>
                            <Divider />
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                Если возникнут вопросы по заказам или аккаунту — напишите нам, и мы поможем.
                            </Typography>
                            <Button
                                variant="text"
                                sx={{ color: ColorsEnum.SECONDARY_BG_DARK, paddingInline: 0 }}
                                onClick={() => navigate(RoutePath[AppRoutes.CONTACTS])}
                            >
                                Открыть чат с поддержкой
                            </Button>
                        </Paper>
                    </Box>
                </Box>

                {isLoading && (
                    <Typography variant="body2" sx={{ opacity: 0.6 }}>
                        Загружаем ваш профиль...
                    </Typography>
                )}
            </Box>
        </Box>
    )
}
