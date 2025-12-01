import { ColorsEnum } from '@/constants/colors/ColorsEnum'
import { Paper, Box, Typography, Chip, Rating } from '@mui/material'
import React from 'react'

type Props = {
    review: any
}

export default function Comments({review}: Props) {
    return (
        <Box key={review.id} sx={{ p: 2, border: `1px ${ColorsEnum.SECONDARY_BG_DARK} solid`, borderRadius: '12px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box>
                <Typography fontWeight="medium">{review.author}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
                {review.date}
            </Typography>
            </Box>
            
            <Rating value={review.rating} size="small" readOnly sx={{ mb: 1 }} />
            
            <Typography variant="body2">
                {review.text}
            </Typography>
        </Box>
    )
}