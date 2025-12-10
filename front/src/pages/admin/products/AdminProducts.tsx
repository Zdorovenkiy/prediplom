import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import CustomInput from '@/features/customInput/CustomInput';
import { useGetProductsQuery } from '@/globalState/model/product/api/productApi';
import { useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '@/globalState/model/admin/api/adminApi';
import type { IProduct } from '@/globalState/model/product/types/productType';
import { Box, Button, CircularProgress, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Chip } from '@mui/material';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

type Props = {}

export default function AdminProducts({}: Props) {
    const { data: products, isLoading, refetch } = useGetProductsQuery();
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
    const [formData, setFormData] = useState<Partial<IProduct>>({
        title: '',
        description: '',
        description_short: '',
        price: 0,
        stock: 0,
        is_discount: false,
    });

    useEffect(() => {
        if (editingProduct) {
            setFormData({
                ...editingProduct,
            });
        } else {
            setFormData({
                title: '',
                description: '',
                description_short: '',
                price: 0,
                stock: 0,
                is_discount: false,
            });
        }
    }, [editingProduct]);

    const handleOpenDialog = (product?: IProduct) => {
        setEditingProduct(product || null);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditingProduct(null);
    };

    const handleSave = async () => {
        try {
            if (editingProduct?.id) {
                // Убираем id и images из тела запроса, преобразуем price в число
                const { id, images, ...updateData } = formData;
                const cleanData = {
                    ...updateData,
                    price: Number(updateData.price) || 0,
                    stock: Number(updateData.stock) || 0,
                };
                await updateProduct({ ...cleanData, id: editingProduct.id });
            } else {
                // При создании также преобразуем price и stock в числа
                const { images, ...createData } = formData;
                const cleanData = {
                    ...createData,
                    price: Number(createData.price) || 0,
                    stock: Number(createData.stock) || 0,
                };
                await createProduct(cleanData);
            }
            refetch();
            handleCloseDialog();
        } catch (error) {
            console.error('Ошибка при сохранении товара:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
            try {
                await deleteProduct({ id }).unwrap();
                refetch();
            } catch (error: any) {
                console.error('Ошибка при удалении товара:', error);
                const errorMessage = error?.data?.message || error?.message || 'Ошибка при удалении товара';
                alert(errorMessage);
            }
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ color: ColorsEnum.MAIN_TEXT }}>
                    Управление товарами
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{ bgcolor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_TEXT }}
                >
                    Добавить товар
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ bgcolor: ColorsEnum.MAIN_BG, borderRadius: '12px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell>Цена</TableCell>
                            <TableCell>Остаток</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.price} ₽</TableCell>
                                <TableCell>{product.stock || 0}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={product.is_discount ? 'Скидка' : 'Обычный'}
                                        size="small"
                                        sx={{
                                            bgcolor: product.is_discount ? ColorsEnum.SECONDARY_BG_LIGHT : ColorsEnum.MAIN_BG,
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(product)}
                                        sx={{ color: ColorsEnum.SECONDARY_BG_DARK }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => product.id && handleDelete(product.id)}
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

            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: ColorsEnum.MAIN_BG,
                    }
                }}
            >
                <DialogTitle sx={{ color: ColorsEnum.MAIN_TEXT }}>
                    {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <CustomInput
                            id="title"
                            label="Название"
                            full={true}
                            borderless={true}
                            value={formData.title || ''}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <CustomInput
                            id="description_short"
                            label="Краткое описание"
                            full={true}
                            borderless={true}
                            value={formData.description_short || ''}
                            onChange={(e) => setFormData({ ...formData, description_short: e.target.value })}
                        />
                        <CustomInput
                            id="description"
                            label="Полное описание"
                            full={true}
                            multiline={true}
                            borderless={true}
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <CustomInput
                                id="price"
                                label="Цена"
                                full={true}
                                borderless={true}
                                type="number"
                                value={formData.price || 0}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            />
                            <CustomInput
                                id="stock"
                                label="Остаток"
                                full={true}
                                borderless={true}
                                type="number"
                                value={formData.stock || 0}
                                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <input
                                type="checkbox"
                                id="is_discount"
                                checked={formData.is_discount || false}
                                onChange={(e) => setFormData({ ...formData, is_discount: e.target.checked })}
                            />
                            <label htmlFor="is_discount" style={{ color: ColorsEnum.MAIN_TEXT }}>
                                Товар со скидкой
                            </label>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ color: ColorsEnum.MAIN_TEXT }}>
                        Отмена
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        sx={{ bgcolor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_TEXT }}
                    >
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

