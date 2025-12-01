import { StyleList } from '@/constants/styles/StyleList'
import CustomBreadcrumbs from '@/features/customBreadcrumbs/CustomBreadcrumbs'
import { AppRoutes } from '@/routers/config/routeConfig'
import { Box } from '@mui/material'

type Props = {}

export default function Basket({}: Props) {
  return (
        <Box className="mainPage" sx={StyleList.pages}>
            <Box className="container" sx={StyleList.pagesContainer}>
                <CustomBreadcrumbs path={[AppRoutes.BASKET]} />
            </Box>
        </Box>
  )
}