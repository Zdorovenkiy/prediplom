import { ColorsEnum } from '@/constants/colors/ColorsEnum'
import { StyleList } from '@/constants/styles/StyleList'
import { useNavigation } from '@/hooks/UseNavigation'
import { RoutePath } from '@/routers/config/routeConfig'
import { Box, Typography } from '@mui/material'

type Props = {}

export default function Footer({}: Props) {
    const navigate = useNavigation();
    return (
        <Box className="footer" sx={{...StyleList.default, bgcolor: ColorsEnum.SECONDARY_BG_DARK, maxHeight: '300px'}}>
            <Box className="container" sx={{...StyleList.container, paddingBlock: "18px", alignItems: 'flex-start'}}>
                <Box className="about" sx={{display: 'flex', flexDirection: 'column', color: ColorsEnum.SECONDARY_TEXT, alignItems: 'flex-start'}}>
                    <Typography variant='h6' sx={{color: ColorsEnum.SECONDARY_TEXT}}>
                        Информация
                    </Typography>
                    <Typography variant='body2' sx={{cursor: 'pointer'}} onClick={() => navigate(RoutePath.about)}>
                        О нас
                    </Typography> 
                    <Typography variant='body2' sx={{cursor: 'pointer'}} onClick={() => navigate(RoutePath.contacts)}>
                        Контакты
                    </Typography> 
                    <Typography variant='body2' sx={{cursor: 'pointer'}}>
                        Политики конфиденциальности
                    </Typography> 
                </Box>
                <Box className="name" sx={{alignSelf: "flex-end"}}>
                    <Typography variant='h6' sx={{color: ColorsEnum.SECONDARY_TEXT}}>
                        Мыцыков Никита Александрович
                    </Typography> 
                </Box>
            </Box>
        </Box>
    )
}