import { ChevronLeft, ChevronRight, Image } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { useKeenSlider } from 'keen-slider/react'

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
    }

    const goToNextSlide = () => {
        instanceRef.current?.next()
    }
    return (
        <Box className="swiper" sx={{width: "100%", position: 'relative'}}>
            <Box ref={sliderRef} className="keen-slider">
                { data ? data.map((item => (
                    <div className="keen-slider__slide" style={{height: "600px"}}>
                        <img style={{height: "600px"}} src={item.image} alt={item.name} />
                    </div>
                ))) : (
                    <>
                        <div className="keen-slider__slide">
                            <Box sx={{bgcolor: "red", height: "600px", display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem'}}>Slide 1</Box>
                        </div>
                        <div className="keen-slider__slide">
                            <Box sx={{bgcolor: "black", height: "600px", display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem'}}>Slide 2</Box>
                        </div>
                        <div className="keen-slider__slide">
                            <Box sx={{bgcolor: "blue", height: "600px", display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem'}}>Slide 3</Box>
                        </div>
                    </>
                )
                }
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