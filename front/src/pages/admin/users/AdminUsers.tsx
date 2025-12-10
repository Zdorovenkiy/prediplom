import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { useGetAllUsersQuery, useUpdateUserRoleMutation, useDeleteUserMutation } from '@/globalState/model/admin/api/adminApi';
import { RoleEnum } from '@/globalState/model/role/types/roleType';
import type { IUser } from '@/globalState/model/user/types/userType';
import { Box, Button, CircularProgress, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, FormControl, IconButton, Chip } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {}

export default function AdminUsers({}: Props) {
    const { data: users, isLoading, refetch } = useGetAllUsersQuery();
    const [updateUserRole] = useUpdateUserRoleMutation();
    const [deleteUser] = useDeleteUserMutation();

    const handleRoleChange = async (userId: number, roleId: number) => {
        try {
            await updateUserRole({ userId, roleId });
            refetch();
        } catch (error) {
            console.error('Ошибка при обновлении роли:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            try {
                await deleteUser({ id });
                refetch();
            } catch (error) {
                console.error('Ошибка при удалении пользователя:', error);
            }
        }
    };

    const getRoleName = (roleId?: number) => {
        switch (roleId) {
            case RoleEnum.ADMIN:
                return 'Администратор';
            case RoleEnum.MANAGER:
                return 'Менеджер';
            case RoleEnum.USER:
                return 'Пользователь';
            default:
                return 'Неизвестно';
        }
    };

    const getRoleColor = (roleId?: number) => {
        switch (roleId) {
            case RoleEnum.ADMIN:
                return ColorsEnum.SECONDARY_BG_DARK;
            case RoleEnum.MANAGER:
                return ColorsEnum.SECONDARY_BG_LIGHT;
            default:
                return ColorsEnum.MAIN_BG;
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, color: ColorsEnum.MAIN_TEXT }}>
                Управление пользователями и ролями
            </Typography>

            <TableContainer component={Paper} elevation={0} sx={{ bgcolor: ColorsEnum.MAIN_BG, borderRadius: '12px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>ФИО</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Телефон</TableCell>
                            <TableCell>Роль</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>
                                    {`${user.surname || ''} ${user.name || ''} ${user.patronymic || ''}`.trim() || 'Не указано'}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone || 'Не указано'}</TableCell>
                                <TableCell>
                                    <FormControl size="small" sx={{ minWidth: 150 }}>
                                        <Select
                                            value={user.role_id ?? RoleEnum.USER}
                                            onChange={(e) => handleRoleChange(user.id!, Number(e.target.value))}
                                            sx={{
                                                bgcolor: ColorsEnum.MAIN_BG,
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: ColorsEnum.SECONDARY_BG_DARK,
                                                },
                                            }}
                                        >
                                            <MenuItem value={RoleEnum.ADMIN}>Администратор</MenuItem>
                                            <MenuItem value={RoleEnum.MANAGER}>Менеджер</MenuItem>
                                            <MenuItem value={RoleEnum.USER}>Пользователь</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        onClick={() => user.id && handleDelete(user.id)}
                                        sx={{ color: ColorsEnum.SECONDARY_BG_DARK }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

