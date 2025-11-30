import { Box, IconButton, TextField } from '@mui/material'
import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { StyleList } from '@/constants/styles/StyleList';
import { useNavigate } from 'react-router';
import { RoutePath } from '@/routers/config/routeConfig';
import CustomInput from '../customInput/CustomInput';

type Props = {}

export default function Header({}: Props) {
    const navigate = useNavigate();

    function navigateHandler(path: string) {
        navigate(path)        
    }
  return (
    <Box className="header" sx={{...StyleList.default, height: "100px"}}>
        <Box className="container" sx={StyleList.container}>
            <Box className="logo">
                <IconButton aria-label="home" onClick={() => navigateHandler(RoutePath.main)}>
                    <ImportContactsIcon sx={{color: ColorsEnum.SECONDARY_TEXT, fontSize: "48px"}} />
                </IconButton>
            </Box>
            <Box className="search" sx={{flexGrow: "1"}}>
                <CustomInput 
                    id='search' 
                    label='Искать'
                    full={true}
                    />
            </Box>
            <Box className="buttons">
                <IconButton aria-label="menu">
                    <MenuIcon sx={{color: ColorsEnum.SECONDARY_TEXT, fontSize: "48px"}} />
                </IconButton>
                <IconButton aria-label="basket">
                    <AddShoppingCartIcon sx={{color: ColorsEnum.SECONDARY_TEXT, fontSize: "48px"}} />
                </IconButton>
                <IconButton aria-label="auth" onClick={() => navigateHandler(RoutePath.auth)}>
                    <AccountCircleIcon sx={{color: ColorsEnum.SECONDARY_TEXT, fontSize: "48px"}} />
                </IconButton>
            </Box>
        </Box>
    </Box>
  )
}