import { ColorsEnum } from '@/constants/colors/ColorsEnum'
import { TextField } from '@mui/material'
import React from 'react'

type Props = {
    id?: string,
    label: string,
    full?: boolean,
    borderless?: boolean,
    type?: React.HTMLInputTypeAttribute,
    required?: boolean,
    multiline?: boolean,
    value?: any,
    onChange?: (e: any) => void
}

export default function CustomInput({id, label, full, borderless, type, required, multiline, value, onChange}: Props) {
    return (
        <TextField 
            onChange={onChange}
            value={value}
            id={id || 'field'} 
            required={required}
            label={label}
            variant="outlined" 
            fullWidth={full}
            type={type}
            multiline={multiline}
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
                        borderColor: !borderless ? 'unset' : ColorsEnum.SECONDARY_BG_DARK,
                        borderWidth: !borderless ? '0px' : '1px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: !borderless ? 'unset' : ColorsEnum.SECONDARY_BG_DARK,
                        borderWidth: !borderless ? '0px' : '2px',
                    },
                }}
            }}
            sx={{maxWidth: "600px"}}
            />
    )
}