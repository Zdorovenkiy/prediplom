import { ColorsEnum } from '@/constants/colors/ColorsEnum'
import type { IReview } from '@/globalState/model/review/types/reviewType'
import { Paper, Box, Typography, Chip, Rating } from '@mui/material'
import React from 'react'

type Props = {
    review: IReview
}

export default function CommentsCard({review}: Props) {
    return (
        <Box key={review.id} sx={{ p: 2, border: `1px ${ColorsEnum.SECONDARY_BG_DARK} solid`, borderRadius: '12px', textAlign: 'start'}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box>
                <Typography fontWeight="medium">{`${review.user?.surname} ${review.user?.name}`}</Typography>
            </Box>
            </Box>
            
            <Rating value={review.rating} size="small" readOnly sx={{ mb: 1 }} />
            
            <Typography variant="body2">
                {review.text}
            </Typography>
        </Box>
    )
}