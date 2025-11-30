import { Box, IconButton, TextField } from '@mui/material'
import { ColorsEnum } from '@/constants/colors/ColorsEnum';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { StyleList } from '@/constants/styles/StyleList';
type Props = {}

export default function Header({}: Props) {
  return (
    <Box className="header" sx={StyleList.default}>
        <Box className="container" sx={StyleList.container}>
            <Box className="logo">
                <IconButton aria-label="home">
                    <ImportContactsIcon sx={{color: ColorsEnum.SECONDARY_TEXT, fontSize: "48px"}} />
                </IconButton>
            </Box>
            <Box className="search" sx={{flexGrow: "1"}}>
                <TextField 
                    id="search" 
                    label="search" 
                    variant="outlined" 
                    fullWidth
                    slotProps={{
                        htmlInput: {sx: {height: '25px'}},
                        inputLabel: {sx: {
                            top: "-5px",
                            '&.Mui-focused': {
                                color: ColorsEnum.MAIN_TEXT,
                            },
                        }},
                        input: {sx: {
                            bgcolor: ColorsEnum.MAIN_BG,
                            color: ColorsEnum.MAIN_TEXT,
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'unset',
                                borderWidth: '0px',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'unset',
                                borderWidth: '0px',
                            },
                        }}
                    }}
                    sx={{maxWidth: "600px"}}
                    />
            </Box>
            <Box className="buttons">
                <IconButton aria-label="menu">
                    <MenuIcon sx={{color: ColorsEnum.SECONDARY_TEXT, fontSize: "48px"}} />
                </IconButton>
                <IconButton aria-label="basket">
                    <AddShoppingCartIcon sx={{color: ColorsEnum.SECONDARY_TEXT, fontSize: "48px"}} />
                </IconButton>
                <IconButton aria-label="auth">
                    <AccountCircleIcon sx={{color: ColorsEnum.SECONDARY_TEXT, fontSize: "48px"}} />
                </IconButton>
            </Box>
        </Box>
    </Box>
  )
}