import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import { useExportDataMutation, useImportDataMutation } from '@/globalState/model/admin/api/adminApi';
import { Box, Button, Paper, Typography, Grid, Divider, TextField } from '@mui/material';
import { useState } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';

type Props = {}

export default function AdminConfig({}: Props) {
    const [exportData] = useExportDataMutation();
    const [importData] = useImportDataMutation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleExport = async (type: 'products' | 'users' | 'orders') => {
        try {
            const blob = await exportData({ type }).unwrap();

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `${type}.xlsx`;
            link.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Ошибка при экспорте:', error);
            alert('Ошибка при экспорте данных');
        }
    };

    const handleImport = async (type: string) => {
        if (!selectedFile) {
            alert('Выберите файл для импорта');
            return;
        }
        try {
            await importData({ type, file: selectedFile });
            alert('Данные успешно импортированы');
            setSelectedFile(null);
        } catch (error) {
            console.error('Ошибка при импорте:', error);
            alert('Ошибка при импорте данных');
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, color: ColorsEnum.MAIN_TEXT }}>
                Конфигурация
            </Typography>

            <Grid container spacing={3}>
                <Grid sx={{xs: 12, md: 6}}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            bgcolor: ColorsEnum.MAIN_BG,
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ color: ColorsEnum.MAIN_TEXT }}>
                            Экспорт данных
                        </Typography>
                        <Divider />
                        <Typography variant="body2" sx={{ color: ColorsEnum.MAIN_TEXT, opacity: 0.7 }}>
                            Экспортируйте данные в формате Excel для резервного копирования или анализа
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Button
                                variant="outlined"
                                startIcon={<FileDownloadIcon />}
                                onClick={() => handleExport('products')}
                                sx={{ borderColor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_BG_DARK }}
                            >
                                Экспорт товаров
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FileDownloadIcon />}
                                onClick={() => handleExport('orders')}
                                sx={{ borderColor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_BG_DARK }}
                            >
                                Экспорт заказов
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FileDownloadIcon />}
                                onClick={() => handleExport('users')}
                                sx={{ borderColor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_BG_DARK }}
                            >
                                Экспорт пользователей
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                <Grid sx={{xs: 12, md: 6}}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            bgcolor: ColorsEnum.MAIN_BG,
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ color: ColorsEnum.MAIN_TEXT }}>
                            Импорт данных
                        </Typography>
                        <Divider />
                        <Typography variant="body2" sx={{ color: ColorsEnum.MAIN_TEXT, opacity: 0.7 }}>
                            Импортируйте данные из файла Excel
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<FileUploadIcon />}
                                sx={{ borderColor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_BG_DARK }}
                            >
                                Выбрать файл
                                <input
                                    type="file"
                                    hidden
                                    accept=".xlsx,.xls"
                                    onChange={handleFileChange}
                                />
                            </Button>
                            {selectedFile && (
                                <Typography variant="body2" sx={{ color: ColorsEnum.MAIN_TEXT }}>
                                    Выбран файл: {selectedFile.name}
                                </Typography>
                            )}
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleImport('products')}
                                    disabled={!selectedFile}
                                    sx={{ bgcolor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_TEXT }}
                                >
                                    Импорт товаров
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => handleImport('orders')}
                                    disabled={!selectedFile}
                                    sx={{ bgcolor: ColorsEnum.SECONDARY_BG_DARK, color: ColorsEnum.SECONDARY_TEXT }}
                                >
                                    Импорт заказов
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid sx={{xs: 12}}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            bgcolor: ColorsEnum.MAIN_BG,
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

