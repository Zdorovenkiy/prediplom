import { ChevronLeft, ChevronRight, Image } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { useKeenSlider } from 'keen-slider/react'
import { useEffect } from 'react'

type Props = {
    data?: any[]
}

export default function Swiper({data}: Props) {
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            slideChanged() {
                console.log('slide changed')
            },
        },
        []
    )

    const goToPrevSlide = () => {
        instanceRef.current?.prev()
        console.log("prev", instanceRef);
    }

    const goToNextSlide = () => {
        instanceRef.current?.next()
        console.log("next", instanceRef);
        
    }

    return (
        <Box className="swiper" sx={{width: "100%", position: 'relative'}}>
            
            <Box ref={sliderRef} className="keen-slider">
                { (data?.length && data[0].image)  ? data.map((item => (
                    <div key={item.id} className="keen-slider__slide" style={{height: "600px"}}>
                        <img style={{height: "600px"}} src={item.image} alt={item.name || "alt"} />
                    </div>
                ))) : (
                    <div className="keen-slider__slide" style={{height: "600px"}}>
                        <img style={{height: "600px"}} src={import.meta.env.VITE_PLACEHOLDER} alt={"default"} />
                    </div>
                )}
            </Box>
            <IconButton 
                onClick={goToPrevSlide}
                sx={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                        bgcolor: 'rgba(255,255,255,1)',
                    }
                }}
            >
                <ChevronLeft />
            </IconButton>
            <IconButton 
                onClick={goToNextSlide}
                sx={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                        bgcolor: 'rgba(255,255,255,1)',
                    }
                }}
            >
                <ChevronRight />
            </IconButton>
        </Box>
    )
}