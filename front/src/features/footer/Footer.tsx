import { ColorsEnum } from '@/constants/colors/ColorsEnum'
import { StyleList } from '@/constants/styles/StyleList'
import { Box, Typography } from '@mui/material'

type Props = {}

export default function Footer({}: Props) {
  return (
    <Box className="footer" sx={{...StyleList.default, bgcolor: ColorsEnum.SECONDARY_BG_LIGHT, maxHeight: '300px'}}>
        <Box className="container" sx={{...StyleList.container, paddingBlock: "18px", alignItems: 'flex-start'}}>
            <Box className="about" sx={{display: 'flex', flexDirection: 'column', color: ColorsEnum.FOOTER_SECONDARY_TEXT, alignItems: 'flex-start'}}>
                <Typography variant='h6' sx={{color: ColorsEnum.FOOTER_MAIN_TEXT}}>
                    Информация
                </Typography>
                <Typography variant='body2' sx={{cursor: 'pointer'}}>
                    О нас
                </Typography> 
                <Typography variant='body2' sx={{cursor: 'pointer'}}>
                    Контакты
                </Typography> 
                <Typography variant='body2' sx={{cursor: 'pointer'}}>
                    Политики конфиденциальности
                </Typography> 
            </Box>
            <Box className="name" sx={{alignSelf: "flex-end"}}>
                <Typography variant='h6' sx={{color: ColorsEnum.FOOTER_MAIN_TEXT}}>
                    Мыцыков Никита Александрович
                </Typography> 
            </Box>
        </Box>
    </Box>
  )
}